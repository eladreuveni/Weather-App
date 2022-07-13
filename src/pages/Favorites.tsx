import { useEffect } from "react";
import CityCard from "../components/CityCard";
import Loader from "../components/Loader";
import { getAllDataForFavorites } from "../store/data/dataSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import './Favorites.scss';

const Favorites = () => {
    const dispatch = useAppDispatch();

    const { favoriteCitiesData: favorites, loading } = useAppSelector(state => state.data);

    useEffect(() => {
        dispatch(getAllDataForFavorites());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="all-favorites">
                {loading ? <Loader /> : favorites.map((c, i) => (
                    <CityCard
                        key={`${c.name}, ${c.country}`}
                        city={`${c.name}, ${c.country}`}
                        pic={c.pic}
                        {...c.todayWeather}
                        day={undefined} // in order to use city
                    />
                ))}
            </div>
        </div>
    )
}

export default Favorites;
