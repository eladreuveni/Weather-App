import { BasicCityData } from "../types";

export const fahrenheitToCelsius = (f: number) => (f - 32) * 5 / 9;

export const celsiusToFahrenheit = (c: number) => c * 9 / 5 + 32;

export const cityToNameCountry = (city: BasicCityData) => `${city.name},${city.country}`;