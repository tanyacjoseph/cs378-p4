import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const Forecast = ({latitude, longitude}) => {
  console.log(`${latitude}, ${longitude}`)
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true); // Set overall loading to true when fetching weather

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=auto&forecast_days=1`
        );
        const data = await response.json();

        if (data.hourly) {
          setWeatherData(data);
          setError(null);
        } else {
          setError(`Could not find weather for latitude ${latitude} and longitude ${longitude}`);
        }
      } catch (error) {
        setError(`Could not find weather for latitude ${latitude} and longitude ${longitude}`);
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false); // Finished loading weather data
      }
    };

    fetchWeather(); // Call the fetchWeather function here

  }, [latitude, longitude]); // Trigger only when location data changes

  // Show loading message if fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there's an error
  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Something went wrong</div>;
  }

  const times = weatherData.hourly.time;
  const temperatures = weatherData.hourly.temperature_2m;

  return (
    <Table className="forecast-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Temperature</th>
        </tr>
      </thead>
      <tbody>
        {times.map((time, index) => (
          <tr key={index}>
            <td>{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
            <td>{temperatures[index]}°F</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Forecast;