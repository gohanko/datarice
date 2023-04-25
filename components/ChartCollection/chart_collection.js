
import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import dayjs from 'dayjs';
import Chart from './chart';

const ChartCollection = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        initializeSocket();
    }, [])

    const initializeSocket = async () => {
        await fetch('/api/temperature_data');
        const socket = io();

        socket.on('connect', () => {
            console.log('Websocket API connected.');
            socket.emit('list-existing-data-files')
        })

        socket.on('list-existing-data-files', (data) => {
            data.map((filename) => {
                socket.emit('load-data-from-data-file', JSON.stringify({ filename: filename }))
            })
        })

        socket.on('load-data-from-data-file', (data) => {
            const usable_data = data['daily']['time'].map((time, index) => ({
                time: dayjs(time).format('MMM D'),
                temperature: data['daily']['temperature_2m_mean'][index] 
            }));


            const chart_data = {};
            chart_data[data['filename']] = usable_data;
            setChartData(chartData => ({
                ...chartData,
                ...chart_data,
            }));
        })
    }
    
    let charts = Object.keys(chartData).map((key, index) => {
        return (<Chart key={index} filename={key} data={chartData[key]}/>)
    })

    return (<React.Fragment>{ charts }</React.Fragment>);
}

export default ChartCollection;