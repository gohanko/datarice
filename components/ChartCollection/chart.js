import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import dayjs from 'dayjs';
import { Layout, Card } from 'antd';

const Chart = ({ filename }) => {
    const [options, setOptions] = useState({});

    useEffect(() => {
        const socket = io();
        socket.on('load-data-from-data-file', (data) => {
            const usable_data = data['daily']['time'].map((time, index) => ({
                time: dayjs(time).format('MMM D'),
                temperature: data['daily']['temperature_2m_mean'][index] 
            }));

            const options = {
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                },
                xAxis: [
                    {
                        type: 'category',
                        data: data['daily']['time']
                    },
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series: [
                    {
                        data: data['daily']['temperature_2m_mean'],
                        type: 'line',
                        smooth: true,
                    },
                ],
                tooltip: {
                    trigger: 'axis',
                },
            }

            console.log(options)

            setOptions(options)
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
            <Layout style={{ height: 240, backgroundColor: 'white' }}>
                <ReactECharts 
                    option={options}
                    style={{ height: 240 }}
                />
            </Layout>
        </Card>
    );
}

export default Chart;