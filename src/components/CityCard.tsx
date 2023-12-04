import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useAppSelector } from "../store/hooks";

import './CityCard.scss';
import WeatherIcon from "./WeatherIcon";

interface Props {
    day?: string;
    city?: string;
    pic: string;
    celsius: { low: number, high: number };
    fahrenheit: { low: number, high: number };
    icon: number;
    text: string;
}
const CityCard = ({ day, city, pic, celsius, fahrenheit, icon, text }: Props) => {
    const [isFlipped, setIsFlipped] = useState(false); // true for data, false for pic

    const tempUnit = useAppSelector(state => state.data.userPreferences.tempUnit);

    const flipToPic = () => { setIsFlipped(true) }

    const flipToData = () => { setIsFlipped(false) }

    // according user preferences, show temp in celsius or fahrenheit
    const adjustedTemp = tempUnit === "celsius" ?
        `${celsius.low}°C - ${celsius.high}°C` :
        `${fahrenheit.low}°F - ${fahrenheit.high}°F`;

    return (
        <div className="card-container" onMouseEnter={flipToPic} onMouseLeave={flipToData}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="front" key={1}>
                    <h3> {day || city}</h3>
                    <h4> {text}</h4>
                    <WeatherIcon code={icon} />
                    <h4>{adjustedTemp}</h4>
                </div>
                <div className="back" key={2}>
                    <img className="daily-img" src={pic} alt="" />
                </div>
            </ReactCardFlip>
        </div>
    )
}

export default CityCard;