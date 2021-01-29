import { useState, useEffect } from 'react';
import { fetchData } from './api/';
import { Cards, CountryPicker, Chart } from './components';
import covidImage from "./images/covid.png";
import styles from './App.module.css';

const App = () => {
  const [baseData, setBaseData] = useState({
    data: {},
    country: '',
  });

  useEffect(() => {
    const fetchApiData = async () => {
      const data = await fetchData();
      setBaseData({ data });
    };
    fetchApiData();
  }, []);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setBaseData({ data, country: country });
  };

  const { data, country } = baseData;

  return (
    <div className={styles.container}>
      <h1 className={styles.main_title}>COVID<img className={styles.covidImage} src={covidImage} alt="covid"/>TRACKER</h1>
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
};

export default App;
