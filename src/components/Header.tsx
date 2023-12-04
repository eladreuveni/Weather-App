import { Switch, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTempUnit } from '../store/data/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import './Header.scss';

const Header = () => {
    const [value, setValue] = useState<'' | 'favorites'>(window.location.pathname === '/favorites' ? 'favorites' : '');

    const tempUnit = useAppSelector(state => state.data.userPreferences.tempUnit);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleChange = (_e: React.SyntheticEvent<Element, Event>, v: '' | 'favorites') => {
        setValue(v);
        navigate(v);
    }

    const toggleTempUnit = (_e: any, v: boolean) => { // fahrenheit = true, celsius = false
        dispatch(setTempUnit(v ? 'fahrenheit' : 'celsius'))
    }

    return (
        <header className='App-header'>
            <div className='header-flex'>
                <Tabs value={value} onChange={handleChange} style={{ height: '100%', minHeight: 0 }}>
                    <Tab label="Home" value='' style={{ minHeight: 0 }} />
                    <Tab label="Favorites" value='favorites' style={{ minHeight: 0 }} />
                </Tabs>
                <div>
                    <span>°C</span>
                    <Switch value={tempUnit} onChange={toggleTempUnit} color="default" />
                    <span>°F</span>
                </div>
            </div>
        </header>
    )
}

export default Header;
