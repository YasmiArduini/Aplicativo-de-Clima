import { useState } from 'react';
import Head from 'next/head';
import '../styles/global.css';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert('Por favor, insira o nome de uma cidade.');
      return;
    }

    try {
      const apiKey = '9199660e6fe10772d369ec858cad3c0f';
      const encodedCity = encodeURIComponent(city.trim()); 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Cidade não encontrada');
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Previsão do Tempo</title>
      </Head>

      <div className="app-container">
        <video autoPlay muted loop className="background-video">
          <source src="./assets/images/background.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>

        <div className="content">
          <h1 className="title">Previsão do Tempo</h1>
          <div className="input-container">
            <input
              type="text"
              placeholder="Digite o nome da cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="city-input"
            />
            <button onClick={fetchWeather} className="search-button">
              Buscar
            </button>
          </div>

          {weather && (
            <div className="weather-info">
              <h2>{weather.name}</h2>
              <p>Temperatura: {weather.main.temp}°C</p>
              <p>Umidade: {weather.main.humidity}%</p>
              <p>Descrição: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
