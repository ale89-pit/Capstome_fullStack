import moment from "moment"
import 'moment/locale/it';
import { useEffect, useState } from "react"
import { Card, Carousel } from "react-bootstrap"
import { useParams } from "react-router-dom"

const Weather = (props) => {
    moment.locale('it');
    const params = useParams()
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    const [loadCord, setLoadCord] = useState(false);

    const API_KEY_WEATHER = "f3d92bb95c614f7651ab7b801955c48f"
    // const API_KEY_WEATHER2 = "Mu2uvB1T1eAvbZkcutyUTDg7TJR2GJLc"
    const API_URL_WEATHER_GEOCODING = `http://api.openweathermap.org/geo/1.0/direct?q=${props.city},{.it}&limit=${1}&appid=${API_KEY_WEATHER}`
    // const API_URL_WEATHER_GEOCODING2 = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY_WEATHER2}&q=${props.city}&language=it`


    const [weather, setWeather] = useState()
    const findCordinates = async () => {
        try {
            let response = await fetch(API_URL_WEATHER_GEOCODING)
            if (response.ok) {
                let result = await response.json()

                setLat(result[0].lat)
                setLon(result[0].lon)
                setLoadCord(true)
            }
        } catch (error) {

        }
    }

    // const findIdCityToForcast = async () => {
    //     console.log("sto iniziando la fetch del meteo")
    //     try {
    //         let response = await fetch(API_URL_WEATHER_GEOCODING2, {
    //             method: "GET",

    //         })
    //         if (response.ok) {
    //             let result = await response.json()
    //             console.log(JSON.stringify(result[0] + "sono il meteo"))
    //             setIdCityWeather(result[0].Key)

    //         }
    //     } catch (error) {

    //     }

    // }

    const API_URL_WEATHER_FORECAST = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric&lang=it`
    // const API_URL_WEATHER_FORECAST2 = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${idCityWeather}?apikey=${API_KEY_WEATHER2}&language=it&metric=true`

    const weatherSeach = async () => {
        try {
            let response = await fetch(API_URL_WEATHER_FORECAST)
            if (response.ok) {
                let result = await response.json()
                setWeather(result)

            }
        } catch (error) {

        }

    }
    // const weatherSeach2 = async () => {
    //     try {
    //         let response = await fetch(API_URL_WEATHER_FORECAST2, {
    //             method: "GET"

    //         })
    //         if (response.ok) {
    //             let result = await response.json()
    //             console.log(result)
    //             setWeather(result)
    //         }
    //     } catch (error) {

    //     }

    // }

    useEffect(() => {
        findCordinates()
        // findIdCityToForcast()
        if (loadCord) {
            weatherSeach()
        }
    }, [])
    useEffect(() => {
        findCordinates()
        // findIdCityToForcast()

        if (loadCord) {
            weatherSeach()
        }
    }, [params.id, lat, lon])
    // 
    // params.id, !idCityWeather
    return (
        <>

            <Card className="mb-2 text-bg-dark ">
                <Card.Header>
                    {weather && weather.city.name} <nbsp ></nbsp><span>Le previsioni per i prossimi 5 giorni</span>

                </Card.Header>
                <Card.Body className="p-0">


                    <Carousel variant="dark" interval={null} className="carousel-weather" indicators={false} pause={false} slide={true}>
                        {weather && weather.list.map((item, index) => {
                            if (index % 6 === 0) {
                                // Creazione di una nuova riga ogni 6 elementi
                                return (
                                    <Carousel.Item>
                                        <div className="d-flex justify-content-between ">
                                            <span>
                                                <p>{moment(item.dt_txt).format('dddd DD/MM')}</p>
                                                <p>{moment(item.dt_txt).format('HH:mm')}</p>
                                                <img
                                                    className=""
                                                    // src={`https://developer.accuweather.com/sites/default/files/${item.Day.Icon}-s.png`}
                                                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                                    alt="Weather Icon"
                                                />
                                                <p>Min: {item.main.temp_min}°C</p>
                                                <p>Max: {item.main.temp_max}°C</p>
                                            </span>
                                            {weather.list[index + 1] && (
                                                <span>
                                                    <p>{moment(weather.list[index + 1].dt_txt).format('dddd DD/MM')}</p>
                                                    <p>{moment(weather.list[index + 1].dt_txt).format('HH:mm')}</p>
                                                    <img
                                                        className="w-16"
                                                        src={`http://openweathermap.org/img/wn/${weather.list[index + 1].weather[0].icon}@2x.png`}
                                                        alt="Weather Icon"
                                                    />
                                                    <p>Min: {weather.list[index + 1].main.temp_min}°C</p>
                                                    <p>Max: {weather.list[index + 1].main.temp_max}°C</p>
                                                </span>
                                            )}
                                            {weather.list[index + 2] && (
                                                <span>
                                                    <p>{moment(weather.list[index + 2].dt_txt).format('dddd DD/MM')}</p>
                                                    <p>{moment(weather.list[index + 2].dt_txt).format('HH:mm')}</p>

                                                    <img
                                                        className="w-16"
                                                        src={`http://openweathermap.org/img/wn/${weather.list[index + 2].weather[0].icon}@2x.png`}
                                                        alt="Weather Icon"
                                                    />
                                                    <p>Min: {weather.list[index + 2].main.temp_min}°C</p>
                                                    <p>Max: {weather.list[index + 2].main.temp_max}°C</p>
                                                </span>
                                            )}
                                            {weather.list[index + 3] && (
                                                <span>
                                                    <p>{moment(weather.list[index + 3].dt_txt).format('dddd DD/MM')}</p>
                                                    <p>{moment(weather.list[index + 3].dt_txt).format('HH:mm')}</p>
                                                    <img
                                                        className="w-16"
                                                        src={`http://openweathermap.org/img/wn/${weather.list[index + 3].weather[0].icon}@2x.png`}
                                                        alt="Weather Icon"
                                                    />

                                                    <p>Min: {weather.list[index + 3].main.temp_min}°C</p>
                                                    <p>Max: {weather.list[index + 3].main.temp_max}°C</p>
                                                </span>
                                            )}
                                            {weather.list[index + 4] && (
                                                <span>
                                                    <p>{moment(weather.list[index + 4].dt_txt).format('dddd DD/MM')}</p>
                                                    <p>{moment(weather.list[index + 4].dt_txt).format('HH:mm')}</p>

                                                    <img
                                                        className="w-16"
                                                        src={`http://openweathermap.org/img/wn/${weather.list[index + 4].weather[0].icon}@2x.png`}
                                                        alt="Weather Icon"
                                                    />

                                                    <p>Min: {weather.list[index + 4].main.temp_min}°C</p>
                                                    <p>Max: {weather.list[index + 4].main.temp_max}°C</p>
                                                </span>
                                            )}
                                            {weather.list[index + 5] && (
                                                <span>
                                                    <p>{moment(weather.list[index + 5].dt_txt).format('dddd DD/MM')}</p>
                                                    <p>{moment(weather.list[index + 5].dt_txt).format('HH:mm')}</p>

                                                    <img
                                                        className="w-16"
                                                        src={`http://openweathermap.org/img/wn/${weather.list[index + 5].weather[0].icon}@2x.png`}
                                                        alt="Weather Icon"
                                                    />
                                                    <p>Min: {weather.list[index + 5].main.temp_min}°C</p>
                                                    <p>Max: {weather.list[index + 5].main.temp_max}°C</p>
                                                </span>
                                            )}
                                        </div>
                                    </Carousel.Item>

                                );
                            }
                            return null;
                        })}
                    </Carousel>
                </Card.Body>
            </Card>

        </>
    );
}

export default Weather;