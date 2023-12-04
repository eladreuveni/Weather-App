import { BasicCityData } from "../types";
import { cityToNameCountry } from "./funcs";

const favKey = 'ertk7';

export const getLSFavorites = () => {
    const favorites = localStorage.getItem(favKey);
    if (!favorites || favorites[0] === '') { return [] }
    const rawFavorites = favorites?.split('|') || [];
    return rawFavorites.map((f: string) => f.split(',')).map((f: string[]) => ({ name: f[0], country: f[1] }));
}

export const addLSFavorite = (city: BasicCityData) => {
    const favorites = getLSFavorites();
    if (!favorites.some(c => c.name === city.name)) {
        favorites.push(city);
        const favoritesForLS = favorites.map(c => cityToNameCountry(c)).join('|');
        localStorage.setItem(favKey, favoritesForLS);
    }
}

export const removeLSFavorite = (city: BasicCityData) => {
    const favorites = getLSFavorites();
    const index = favorites.findIndex((c) => c.name === city.name);
    if (index > -1) {
        favorites.splice(index, 1);
        if (!favorites.length) { localStorage.removeItem(favKey) }
        const favoritesForLS = favorites.map(c => cityToNameCountry(c)).join('|');
        localStorage.setItem(favKey, favoritesForLS);
    }
}

export const isCityFavorite = (city: BasicCityData) => {
    if (!city) return false;
    const favorites = getLSFavorites();
    return favorites.some(c => c.name === city.name);
}