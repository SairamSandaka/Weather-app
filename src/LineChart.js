import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Linechart.css'; // Import the CSS file

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Linechart = (props) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedDate = `${day} ${month}, ${hours}:${minutes}`;
        return formattedDate;
    };

    if (!props.weatherData || !props.weatherData.list) {
        return <p>No data available</p>;
    }

    const data = props.weatherData;
    const labels = data.list.map((item) => formatDate(item.dt_txt));
    const temp = data.list.map((item) => item.main.temp);
    const feels_like = data.list.map((item) => item.main.feels_like);

    const graphData = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature',
                data: temp,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1,
            },
            {
                label: 'Feels Like',
                data: feels_like,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                tension: 0.1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Weather Data',
            },
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            }
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 10, // Limit the number of ticks
                    autoSkipPadding: 50, // Increase the padding between skipped labels
                }
            }
        }
    };

    return (
        <>
            <div className="chart-container">
                <Line data={graphData} options={options} />
            </div>
        </>
    );
};

export default Linechart;
