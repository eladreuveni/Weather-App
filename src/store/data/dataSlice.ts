import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasicCityData, DailyWeather, FavoriteCityData } from '../../types';
import { getLSFavorites } from '../../utils/local-storage';
import { fetchPhotos, getCitiesForAutoComplete, getWeatherForCity } from './thunks';

export interface DataState {
    error: boolean;
    searchPhotos: { id: number, url: string }[];
    citiesPool: BasicCityData[];
    chosenCityData: BasicCityData;
    fiveDaysForecast: DailyWeather[];
    favoriteCitiesData: FavoriteCityData[];
    userPreferences: { tempUnit: 'celsius' | 'fahrenheit' };
}

const initialState: DataState = {
    error: false,
    searchPhotos: [],
    citiesPool: [],
    chosenCityData: {
        name: 'Tel Aviv',
        country: 'Israel'
    },
    fiveDaysForecast: [],
    favoriteCitiesData: [],
    userPreferences: { tempUnit: 'celsius' }
};

export const fetchCityPhotos = createAsyncThunk(
    'data/fetchCityPhotos',
    async (payload: { city: string, country?: string }, { rejectWithValue }) => {
        try {
            const response = await fetchPhotos(payload.city, payload.country || 'city');
            return response;
        }
        catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const getCitiesAutoComplete = createAsyncThunk(
    'data/getCitiesAutoComplete',
    async (city: string, { rejectWithValue }) => {
        try {
            const response = await getCitiesForAutoComplete(city);
            return response;
        }
        catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const get5DaysForecast = createAsyncThunk(
    'data/get5DaysForecast',
    async (city: string, { rejectWithValue }) => {
        try {
            const response = await getWeatherForCity(city, 5);
            return response;
        }
        catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const chooseCity = createAsyncThunk(
    'data/chooseCity',
    async (payload: BasicCityData, { dispatch, rejectWithValue }) => {
        try {
            rejectWithValue(payload);
            dispatch(get5DaysForecast(`${payload.name},${payload.country}`));
            dispatch(fetchCityPhotos({ city: payload.name, country: payload.country }));
            dispatch(clearCitiesPool());
            return payload;
        }
        catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const getAllDataForFavorites = createAsyncThunk(
    'data/getAllDataForFavorites',
    async (_, { rejectWithValue }) => {
        try {
            const favorites = getLSFavorites();
            const promises = favorites.map(async (city) => ({
                ...city,
                todayWeather: (await getWeatherForCity(`${city.name},${city.country}`, 1))[0],
                pic: (await fetchPhotos(city.name, city.country))[0].url
            }))
            const data = await Promise.all(promises);
            return data;
        }
        catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        clearCitiesPool: (state) => {
            state.citiesPool = [];
        },
        setTempUnit: (state, action: PayloadAction<'celsius' | 'fahrenheit'>) => {
            state.userPreferences.tempUnit = action.payload
        },
        setErrorFalse: (state) => {
            state.error = false
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchCityPhotos
            .addCase(fetchCityPhotos.fulfilled, (state, action) => { state.searchPhotos = action.payload })
            // getCitiesAutoComplete
            .addCase(getCitiesAutoComplete.fulfilled, (state, action) => { state.citiesPool = action.payload })
            // get5DaysForecast
            .addCase(get5DaysForecast.fulfilled, (state, action) => { state.fiveDaysForecast = action.payload })
            // chooseCity
            .addCase(chooseCity.fulfilled, (state, action) => { state.chosenCityData = action.payload })
            // getAllDataForFavorites
            .addCase(getAllDataForFavorites.fulfilled, (state, action) => { state.favoriteCitiesData = action.payload })
            // matchers for all functions
            .addMatcher((action) => action.type.endsWith("/rejected"), (state) => {
                state.error = true;
            })
    },
});

export const { clearCitiesPool, setTempUnit, setErrorFalse } = dataSlice.actions;

export default dataSlice.reducer;