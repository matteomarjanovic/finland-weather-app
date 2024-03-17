import pickle
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from numpy import isnan
from pydantic import BaseModel
from .variables import CITIES_LIST
from .dependencies.cache import cache
from .variables import redis_timeout_seconds

from fmiopendata.wfs import download_stored_query

from typing import List
import datetime as dt


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

# schemas for responses
class City(BaseModel):
    name: str

class Weather(BaseModel):
    city_name: str
    temperature: float | None
    wind_speed: float | None
    wind_direction: int | None


@app.get("/cities", response_model=List[City])
async def get_cities():
    CITIES_LIST.sort()
    return [City(name=el) for el in CITIES_LIST]


@app.get("/weather/{city_name}", response_model=Weather)
async def get_weather_by_city_name(city_name: str, redis_client: cache = Depends(cache)):

    if (cached_profile := redis_client.get(city_name)) is not None:
        return pickle.loads(cached_profile)

    end_time = dt.datetime.now(dt.timezone.utc).replace(tzinfo=None)
    start_time = end_time - dt.timedelta(hours=1)

    # Convert times to properly formatted strings
    start_time = start_time.isoformat(timespec="seconds") + "Z"
    end_time = end_time.isoformat(timespec="seconds") + "Z"

    # use fmi opendata python library to fetch weather observation
    observations = download_stored_query(
        "fmi::observations::weather::multipointcoverage",
        args=[
            f"place={city_name}",
            "starttime=" + start_time,
            "endtime=" + end_time
        ]
    )

    # if no observations about given city is found, return "empty" object
    if not list(observations.data.keys()):
        result = Weather(
            city_name=city_name,
            temperature=None,
            wind_speed=None,
            wind_direction=None
        )
        redis_client.set(city_name, pickle.dumps(result))   # save in redis cache
        redis_client.expire(city_name, redis_timeout_seconds)   # set val timeout in redis cache
        return result

    latest_tstep = max(list(observations.data.keys()))
    result_dict = list(observations.data[latest_tstep].values())[0]

    temp = result_dict['Air temperature']['value']
    wind_speed = result_dict['Wind speed']['value']
    wind_dir = result_dict['Wind direction']['value']

    weather_observation = Weather(
        city_name=city_name,
        temperature=None if isnan(temp) else temp,
        wind_speed=None if isnan(wind_speed) else wind_speed,
        wind_direction=None if isnan(wind_dir) else wind_dir
    )

    redis_client.set(city_name, pickle.dumps(weather_observation))  # save in redis cache
    redis_client.expire(city_name, redis_timeout_seconds)   # set val timeout in redis cache

    return weather_observation