import React, {useRef} from "react";
import Button from 'react-bootstrap/Button';

const SearchBar = ({cities, setCities, onSubmit}) => {
    const inputCityLat = useRef();
    const inputCityLong = useRef();

    const handleClick = () => {
        setCities([...cities, {'latitude': inputCityLat.current.value, 'longitude': inputCityLong.current.value}]);
        onSubmit(inputCityLat.current.value, inputCityLong.current.value)
        inputCityLat.current.value = "";
        inputCityLong.current.value = "";
    }

    return (
        <div className="search-container">
            <p>Latitude</p>
            <input
                type="text"
                ref={inputCityLat}
                className="search-input"
            />
            <p>Longitude</p>
            <input
                type="text"
                ref={inputCityLong}
                className="search-input"
            />
            <Button onClick={handleClick} variant="secondary">+</Button>
        </div>
    );
};

export default SearchBar;