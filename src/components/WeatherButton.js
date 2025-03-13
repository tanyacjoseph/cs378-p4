import React from "react";
import Button from 'react-bootstrap/Button';

const WeatherButton = ({latitude, longitude, onClick}) => {
    const buttonString = latitude + ', ' + longitude
    return (
        <Button onClick={() => onClick(latitude, longitude)} variant="secondary">{buttonString}</Button>
    );
};

export default WeatherButton;