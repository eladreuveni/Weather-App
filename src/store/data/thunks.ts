import axios from "axios";
import { DailyWeather } from "../../types";
import { celsiusToFahrenheit } from "../../utils/funcs";

export const fetchPhotos = async (city: string, country: string): Promise<{ id: number, url: string }[]> => {
    const API_KEY = '28531388-3a83e7851836cf7a6b68f656f';
    const cityURL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(city)}&per_page=6`;

    try {
        const res1 = await axios.get(cityURL);
        if (res1.data.hits && res1.data.hits.length) {
            return res1.data.hits.map((i: any) => ({ id: i.id, url: i.largeImageURL }));
        }
        const countryURL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(country || 'city')}&per_page=6`;
        const res2 = await axios.get(countryURL);
        return res2.data.hits.map((i: any) => ({ id: i.id, url: i.largeImageURL }));
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}

export const getCitiesForAutoComplete = async (search: string) => {
    const options = {
        method: 'GET',
        url: 'https://spott.p.rapidapi.com/places/autocomplete',
        params: { limit: '50', skip: '0', q: search, type: 'CITY' },
        headers: {
            'X-RapidAPI-Key': 'f48e2746b2msh8c662e7d8cf7b14p1c8442jsnca444c633ed0',
            'X-RapidAPI-Host': 'spott.p.rapidapi.com'
        }
    };

    try {
        const res = await axios.request(options);
        return res.data.map((c: any) => ({ name: c.name, country: c.country.name }));
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}

export const getWeatherForCity = async (city: string, days: number = 5) => {
    const options = {
        method: 'GET',
        url: 'https://yahoo-weather5.p.rapidapi.com/weather',
        params: { location: city, format: 'json', u: 'c' },
        headers: {
            'X-RapidAPI-Key': 'f48e2746b2msh8c662e7d8cf7b14p1c8442jsnca444c633ed0',
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    try {
        const res = await axios.request(options);

        const firstFive: DailyWeather[] = res.data.forecasts.slice(0, days)
            .map((d: any) => (
                {
                    day: d.day,
                    celsius: { low: d.low, high: d.high },
                    fahrenheit: { low: Math.round(celsiusToFahrenheit(d.low)), high: Math.round(celsiusToFahrenheit(d.high)) },
                    icon: d.code,
                    text: d.text
                }
            ));
        return firstFive;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}

