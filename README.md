# Finland Weather app
This is a web app that allows to see the latest weather observations for Finnish cities and filter them by city name.

## Usage
To start the app, open a terminal, clone this repository and go into the repo directory, with the two following commands:
```
git clone https://github.com/matteomarjanovic/finland-weather-app.git
cd finland-weather-app
```
Then, run this command to build and run the app with Docker Compose:
```
docker compose up --build
```
After that, open a browser and go to:
```
http://localhost:3000
```

## Implementation details
This app consists of a FastAPI (python) server, which uses Redis to cache the results, and a React JS client to view the fetched observations.

The whole system is packed into docker-compose, which builds both the back-end and the front-end using their own Dockerfiles.

### React front-end
The react front-end has been created using the create-react-app build tool.
It has 3 main components:
- `Header.jsx`: the nav bar of the app, which contain the icon (AI generated and edited manually), the app title and the search bar. In smaller screens (phone sized) the title disappear, giving the whole nav bar space to the search bar. The nav bar is "elevated" when the user scroll down;
- `Body.jsx`: it contains the actual body of the app, where the weather observations are shown. It calls the */cities* GET API to retrieve the cities array from the back-end, and maps them into many cards. Each of these card is wrapped in a `RenderIfVisible` component, which renders the cards only if they are near the viewport, avoiding useles API calls for weather observations of cities that are not visible. The map function only return the cards if the city name match with the string the string that is inserted in the search input, allowing the user to filter the results. A regex is used for this aim;
- `CityCard.jsx`: it contains the actual weather observation, retrieved from the back-end using the */weather/{city_name}* GET API. Along with the city name, the air temperature and wind info are shown in the card: these are side by side in large screens, in column in smaller screens (phone sized). While waiting for API response, a MUI `Skeleton` component is used as placeholder.

### FastAPI back-end
The back-end server has been implemented in Python, using the FastAPI framework. The two provided APIs are implemented in `server/app/main.py` file. In order to see the Swagger documentation, go to the following link while the app is up and running:
```
http://localhost:8000/docs
```

The */weather/{city_name}* API has a dependency called `redis_client`, which provides the Redis cache support. For that reason, every time a result is retrieved from FMI Open APIs, this is cached and an expiration timeout is set for that city. The timeout (in minutes) is defined in the `server/.env` file, as the `CACHE_TIMEOUT_MIN` environment variable. The value is set to 30 minutes since the daily limit for FMI Open APIs is 20000 calls, so it's easily computable that, even getting observations for all the 357 cities every 30 minutes (worst case) that limit won't be surpassed.

## Author
Matteo Marjanovic