import { Autocomplete, TextField } from '@mui/material';
import { chooseCity, clearCitiesPool, getCitiesAutoComplete } from '../store/data/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { BasicCityData } from '../types';

import './CityAutoComplete.scss';

const CityAutoComplete = () => {
    const dispatch = useAppDispatch();
    const citiesPool = useAppSelector(state => state.data.citiesPool);

    return (
        <div className='ac-container'>
            <Autocomplete
                id="combo-box-demo"
                dir='rtl'
                value={null}
                disablePortal
                options={citiesPool}
                getOptionLabel={c => `${c.name}, ${c.country}`}
                renderInput={(params) => {
                    return <TextField {...params} label="Please enter city" />
                }}
                onInputChange={(_e, v) => {
                    if (v.length >= 3) {
                        dispatch(getCitiesAutoComplete(v));
                    }
                    else {
                        dispatch(clearCitiesPool());
                    }
                }}
                onChange={(_e, v: BasicCityData | null) => {
                    if (!v) return;
                    dispatch(chooseCity(v));
                }}
            />
        </div>
    )
}

export default CityAutoComplete;