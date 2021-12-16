import "./app.scss";
import { useState } from "react";

function App() {
  const [datas, setDatas] = useState();
  const [city, setCity] = useState();

  const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${city}&aqi=no`;

  const fetchData = async () => {
    try {
      await fetch(url).then((response) =>
        response.json().then((data) => setDatas(data))
      );
      setCity("");
    } catch (err) {
      console.log(err);
    }
  };

  const cityHandler = (e) => {
    setCity(e.target.value);
  };

  const keyPress = (evt) => {
    if (evt.key === "Enter") {
      fetchData();
    }
  };

  if (datas) {
    return (
      <section className="app-container">
        <div className="header-container">
          <h1>Cong's Weather App</h1>
          <input
            value={city}
            placeholder="Enter City..."
            onChange={cityHandler}
            type="text"
            onKeyPress={keyPress}
          />
        </div>
        {typeof datas.location === "undefined" ? (
          <div className="no-city">
            <p>
              Welcome to Cong's Weather App, Enter a city to get the weather.
            </p>
          </div>
        ) : (
          <div>
            <div className="location-container">
              <h2>{`${datas.location.name}, ${datas.location.region}`}</h2>
              <h2>{datas.location.country}</h2>
            </div>

            <div className="temp-container">
              <img src={datas.current.condition.icon} alt="weather icon" />
              <p>{`${datas.current.temp_c}°C`}</p>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="app-container">
      <div className="header-container">
        <h1>Cong's Weather App</h1>
        <input
          value={city}
          placeholder="Enter City..."
          onChange={cityHandler}
          type="text"
          onKeyPress={keyPress}
        />
      </div>
      <div className="no-city">
        <p>Welcome to Cong's Weather App, Enter a city to get the weather.</p>
      </div>
    </section>
  );
}

export default App;
