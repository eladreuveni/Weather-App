export interface DailyWeather {
    day: string;
    celsius: { low: number, high: number };
    fahrenheit: { low: number, high: number };
    icon: number;
    text: string;
}

export interface BasicCityData {
    name: string;
    country: string;
}

export interface CityData extends BasicCityData {
    fiveDaysForecast: DailyWeather[];
}

export interface FavoriteCityData extends BasicCityData {
    todayWeather: DailyWeather;
    pic: string;
}