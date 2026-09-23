import React, { useState, useEffect } from 'react';
import { MapPin, Wind, Droplets, Sun, Navigation } from 'lucide-react';
import styles from './WeatherWidget.module.scss';

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export const WeatherWidget: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat?: number, lon?: number) => {
    setLoading(true);
    setError(null);

    try {
      // Імітація асинхронного запиту до сервісу погоди (Open-Meteo або аналог)
      await new Promise((res) => setTimeout(res, 600));

      setData({
        city: lat && lon ? 'Поточна геопозиція' : 'Київ',
        temp: Math.round(18 + Math.random() * 5),
        condition: 'Сонячно',
        humidity: 62,
        windSpeed: 4.2,
      });
    } catch (err) {
      setError('Не вдалося завантажити дані погоди');
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Геолокація не підтримується браузером');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => setError('Доступ до геопозиції відхилено')
    );
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <div>Завантаження погоди...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.cityInfo}>
        <MapPin size={16} />
        <span>{data.city}</span>
        <button
          type="button"
          className={styles.geoBtn}
          onClick={handleGeolocation}
          title="Визначити моє місцезнаходження"
        >
          <Navigation size={14} />
        </button>
      </div>

      <div className={styles.weatherMain}>
        <div className={styles.tempSection}>
          <span className={styles.tempSectionValue}>{data.temp}°</span>
          <span className={styles.tempSectionUnit}>C</span>
        </div>
        <Sun size={42} color="var(--color-warning, #f59e0b)" />
      </div>

      <div className={styles.weatherDetails}>
        <div className={styles.detailItem}>
          <Droplets size={16} />
          <span>Вологість: {data.humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <Wind size={16} />
          <span>Вітер: {data.windSpeed} м/с</span>
        </div>
      </div>
    </div>
  );
};