import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import dayjs from 'dayjs';
import { Layout, Card } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const Chart = ({ filename, socket }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const socket = io();
        socket.on('load-data-from-data-file', (data) => {
            const usable_data = data['daily']['time'].map((time, index) => ({
                time: dayjs(time).format('MMM D'),
                temperature: data['daily']['temperature_2m_mean'][index] 
            }));
                        
            setChartData(usable_data)
        })

        socket.emit('load-data-from-data-file', JSON.stringify({ filename: filename }));
    }, [])
    
    return (
        <Card title={filename}>
            <div
                style={{
                    width: '100%',
                    display: 'flow-root',
                    marginBottom: '10px',
                }}
            >

            </div>
            <Layout style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} style={{ backgroundColor: 'white' }}>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </Layout>
        </Card>
    );
}

export default Chart;