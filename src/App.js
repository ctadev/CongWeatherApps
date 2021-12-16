import "./app.scss";
import { useState, useEffect } from "react";

function App() {
  const [datas, setDatas] = useState();
  const [city, setCity] = useState();

  const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${city}&aqi=no`;

  const fetchData = async () => {
    try {
      await fetch(url).then((response) =>
        response.json().then((data) => setDatas(data))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cityHandler = (e) => {
    setCity(e.target.value);
  };

  const KeyPress = (event) => {
    if (event.key === "Enter") {
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
            onKeyPress={KeyPress}
          />
          <button onClick={() => fetchData()}>Search</button>
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
              <img src={datas.current.condition.icon} />
              <p>{`${datas.current.temp_c}°C`}</p>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <div>
      <h1>Loading...Api fetching....</h1>
    </div>
  );
}

export default App;
