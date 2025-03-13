import './App.css';
import { useState } from 'react';
import WeatherButton from './components/WeatherButton';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';

function App() {
  const [cities, setCities] = useState([{'latitude': 30.26715, 'longitude': -97.74306},
                                        {'latitude': 32.78306, 'longitude': -96.80667},
                                        {'latitude': 29.76328, 'longitude': -95.36327}
                                      ]);
  const [selectedCity, setSelectedCity] = useState({'latitude': 30.26715, 'longitude': -97.74306})

  const changeSelectedCity = (latitude, longitude) => {
    setSelectedCity({'latitude': latitude, 'longitude': longitude})
  }

  console.log(selectedCity)

  return (
    <div className='weather-application'>
      <div className='buttons-container'>
        {cities.map((city) => (
          <WeatherButton 
            key={city}
            latitude={city.latitude}
            longitude={city.longitude}
            onClick={changeSelectedCity}
          />
        ))}
      </div>
      <SearchBar
        cities={cities}
        setCities={setCities}
        onSubmit={changeSelectedCity}
      />
      <Forecast 
        latitude={selectedCity.latitude}
        longitude={selectedCity.longitude}
      />
    </div>
  );
}

export default App;
