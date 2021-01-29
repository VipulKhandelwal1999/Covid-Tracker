import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: ['#3333ff', '#39ff14', '#F53844'],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `CURRENT STATE IN ${country?.toUpperCase()}`,
          fontColor: '#fff',
          fontSize: 13,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: '#fff',
                fontSize: 15,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: '#fff',
                fontSize: 15,
              },
            },
          ],
        },
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          {
            data: dailyData.map((data) => data.recovered),
            label: 'Recovered',
            borderColor: '#39ff14',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
        ],
      }}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: '#fff',
                fontSize: 15,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: '#fff',
                fontSize: 14,
              },
            },
          ],
        },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
