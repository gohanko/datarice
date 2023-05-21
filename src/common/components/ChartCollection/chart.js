import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import dayjs from 'dayjs';
import { Layout, Card } from 'antd';

const Chart = ({ filename }) => {
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const socket = io();
        socket.on('load-data-from-data-file', (data) => {
            if (data.filename !== filename) {
                return
            }

            const chart_options = {
                tooltip : {
                    trigger: 'axis'
                },
                grid: { top: 8, right: 8, bottom: 24, left: 36 },
                xAxis: [
                    {
                        type: 'category',
                        data: data['daily']['time'].map((time) => (dayjs(time).format('MMM D')))
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

            setChartOptions(chartOptions => ({
                ...chartOptions,
                ...chart_options,
            }))
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
                    option={chartOptions}
                    style={{ height: 240 }}
                />
            </Layout>
        </Card>
    );
}

export default Chart;