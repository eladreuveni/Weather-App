import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCityPhotos, get5DaysForecast } from "../store/data/dataSlice";
import { addLSFavorite, isCityFavorite, removeLSFavorite } from "../utils/local-storage";
import CityCard from "./CityCard";

import './ChosenCityBox.scss';
import Loader from "./Loader";

const ChosenCityBox = () => {
    const dispatch = useAppDispatch();
    const { searchPhotos: photos, fiveDaysForecast, chosenCityData, loading } = useAppSelector(state => state.data);
    const [isFavorite, setIsFavorite] = useState(isCityFavorite(chosenCityData));

    useEffect(() => {
        dispatch(fetchCityPhotos({ city: chosenCityData.name, country: chosenCityData.country }));
        dispatch(get5DaysForecast(`${chosenCityData.name},${chosenCityData.country}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setIsFavorite(isCityFavorite(chosenCityData));
    }, [chosenCityData])

    const toggleFavorite = () => {
        setIsFavorite(prev => {
            const newValue = !prev;
            newValue ? addLSFavorite(chosenCityData) : removeLSFavorite(chosenCityData);
            return newValue;
        })
    };

    return (
        <Box className="five-days-container">
            <div className="top-line">
                <div className="top-left">
                    <img className="city-img" src={photos[0]?.url} alt="city" />
                    <div className="name-temp">
                        <h3>{chosenCityData?.name}</h3>
                        <span>{chosenCityData?.country}</span>
                    </div>
                </div>
                <div className="top-right">
                    <div onClick={toggleFavorite} className={`heart ${isFavorite ? 'check' : 'un-check'}`}></div>
                    <Button sx={{ height: '2rem', width: '15rem', marginTop: '13px' }} variant={isFavorite ? 'contained' : 'outlined'} onClick={toggleFavorite}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </Button>
                </div>
            </div>
            <h2 className="title">Scattered Clouds</h2>
            <div className="five-cards-container">
                {loading ? <Loader /> : fiveDaysForecast.map((d, i) => (
                    <CityCard
                        key={d.day}
                        pic={photos[i + 1]?.url}
                        {...d}
                    />
                ))}
            </div>
        </Box >
    )
}

export default ChosenCityBox;
