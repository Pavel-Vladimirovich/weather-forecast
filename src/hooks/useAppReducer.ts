import { useReducer } from "react";
import { CurrentForecast, DailyForecast } from "../api/weather-api";

const initialState = {
    currentForecastData: {
        "coord": {
            "lon": 0,
            "lat": 0
          },
          "weather": [
            {
              "id": 0,
              "main": "",
              "description": "",
              "icon": ""
            }
          ],
          "base": "",
          "main": {
            "temp": 0,
            "feels_like": 0,
            "temp_min": 0,
            "temp_max": 0,
            "pressure": 0,
            "humidity":0,
            "sea_level": 0,
            "grnd_level": 0
          },
          "visibility": 0,
          "wind": {
            "speed": 0,
            "deg": 0,
            "gust": 0
          },
          "rain": {
            "1h": 0
          },
          "clouds": {
            "all": 0
          },
          "dt": 0,
          "sys": {
            "type": 0,
            "id": 0,
            "country": "",
            "sunrise": 0,
            "sunset": 0
          },
          "timezone": 0,
          "id": 0,
          "name": "",
          "cod": 0
    } as CurrentForecast,
    dailyForecastData: [] as DailyForecast[],
    loader: true as boolean,
    messageError: null as string | null,
    currentWeather: {} as DailyForecast
}


const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case "CURRENT-FORECAST":{
            return {
                ...state,
               currentForecastData: {...action.payload}
            }
        }
        case "DAILY-FORECAST":
            return {
                ...state,
                dailyForecastData: [...state.dailyForecastData, {...action.payload}]
            }
        case "LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "ERROR":
            return {
                ...state,
                messageError: action.payload
            }
        case "CURRENT-WEATHER":
            return {
                ...state,
                currentWeather: action.payload
            }
        default:
            return state
    }

}
export const useAppReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return {state,  dispatch}
}

//Actions
export const currentForecast = (currentForecastData: CurrentForecast) => ({type: 'CURRENT-FORECAST', payload: currentForecastData} as const)
export const dailyForecast = (dailyForecastData: DailyForecast) => ({type: 'DAILY-FORECAST', payload: dailyForecastData} as const)
export const setError = (error: string | null) => ({type: 'ERROR', payload: error} as const)
export const loader = (value: boolean) => ({type: 'LOADER', payload: value} as const)
export const currentWeather = (forecastData: DailyForecast) => ({type: 'CURRENT-WEATHER', payload: forecastData} as const)

//Types
type State = typeof initialState

export type Actions =
    | ReturnType<typeof currentForecast>
    | ReturnType<typeof dailyForecast>
    | ReturnType<typeof setError>
    | ReturnType<typeof loader>
    | ReturnType<typeof currentWeather>