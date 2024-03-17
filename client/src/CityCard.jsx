import { Box, Card, Grid, Icon, Skeleton, Typography } from "@mui/material"
import SouthIcon from '@mui/icons-material/South';
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";



const CityCard = ({ cityName }) => {
    const theme = useTheme()
    const [temperature, setTemperature] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
    const [windDirection, setWindDirection] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function getWeather() {
        setIsLoading(true)
        const weatherObs = await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/weather/${cityName}`,
            { method: 'GET' }
        ).then((response) => response.json())

        setTemperature(weatherObs.temperature)
        setWindSpeed(weatherObs.wind_speed)
        setWindDirection(weatherObs.wind_direction)
        setIsLoading(false)
    }


    useEffect(() => {
        getWeather()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Card variant="outlined"
            sx={{
                m: '5px 0',
                height: '80px',
                borderColor: theme.palette.primary.main,
                borderWidth: '3px',
                backgroundColor: theme.palette.secondary.main
            }}
        >
            <Grid container height='100%' width='100%'>
                {/* CITY NAME */}
                <Grid item xs={4} m='auto'>
                    <Typography
                        textAlign={{ xs: 'left', sm: 'center' }}
                        margin={{ xs: '0 15px', sm: '0' }}
                        fontSize={{ xs: '24px', sm: '28px' }}
                        component='div'
                    >
                        {cityName}
                    </Typography>
                </Grid>
                {/* CITY WEATHER OBSERVATION */}
                <Grid item container xs={8}>
                    {/* TEMPERATURE */}
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        m='auto'
                        display='flex'
                        justifyContent={{ xs: 'right', sm: 'center' }}
                    >
                        {isLoading ?
                            <Skeleton
                                variant="rounded"
                                sx={{ margin: { xs: '0 15px', sm: 'auto' } }}
                                height={20}
                                width='40%'
                            /> :
                            <Typography
                                textAlign={{ xs: 'left', sm: 'center' }}
                                fontSize={{ xs: '20px', sm: '28px' }}
                                margin={{ xs: '0 15px', sm: '0' }}
                            >
                                {temperature ? `${temperature} °C` : '— °C'}
                            </Typography>
                        }
                    </Grid>
                    {/* WIND */}
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        display='flex'
                        m='auto'
                        justifyContent={{ xs: 'right', sm: 'center' }}
                    >
                        {isLoading ?
                            <Skeleton
                                variant="rounded"
                                sx={{ margin: { xs: '0 15px', sm: 'auto' } }}
                                height={20}
                                width='40%'
                            /> :
                            <>
                                <Typography
                                    fontSize={{ xs: '20px', sm: '24px', md: '28px' }}
                                    margin={windSpeed ? 0 : '0 15px'}
                                >
                                    {windSpeed ? `Wind: ${windSpeed} m/s` : '— m/s'}
                                </Typography>
                                {windDirection &&
                                    <Box
                                        m='auto 15px auto 5px'
                                        sx={{ transform: `rotate(${windDirection}deg)` }}
                                    >
                                        <Icon>
                                            <SouthIcon />
                                        </Icon>
                                    </Box>
                                }
                            </>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default CityCard