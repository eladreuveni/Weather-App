import { useEffect, useState } from "react";
import CityCard from "../components/CityCard";
import Loader from "../components/Loader";
import { getAllDataForFavorites } from "../store/data/dataSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import './Favorites.scss';

const Favorites = () => {
    const dispatch = useAppDispatch();

    const { favoriteCitiesData: favorites } = useAppSelector(state => state.data);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getAllDataForFavorites()).then(() => { setIsLoading(false) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="all-favorites">
                {isLoading ? <Loader /> :
                    favorites.length > 0 ?
                        favorites.map((c, i) => (
                            <CityCard
                                key={`${c.name}, ${c.country}`}
                                city={`${c.name}, ${c.country}`}
                                pic={c.pic}
                                {...c.todayWeather}
                                day={undefined} // in order to use city
                            />
                        )) :
                        <div>
                            <h3>{"You don't have any favorite cities :("}</h3>
                            <h3>{"Please add some..."}</h3>
                        </div>}
            </div>
        </div>
    )
}

export default Favorites;
