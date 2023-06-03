import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import dayjs from 'dayjs';
import { Card } from 'antd';

type ChartProps = {
    filename: string
}

const Chart = ({ filename }: ChartProps) => {
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const socket = io();
        socket.on('load-data-from-data-file', (data) => {
            if (data.filename != filename) {
                return
            }

            const findMinFromSeriesList = (series_list) => {
                var data = []
                series_list.map(series => {
                    data = [...data, ...series.data]
                })

                data = data.filter((p) => p != null) // Filter out all 'null'
                return Math.floor(Math.min(...data)) - 1
            }

            const xAxis = [
                {
                    type: 'category',
                    data: data['data'][Object.keys(data['data'])[0]].map((time) => (dayjs(time).format('MMM D')))
                }
            ]
            const series_list = []

            // If LineChart first data is the xAxis, the rest are data for yAxis.
            Object.entries(data['data']).forEach(([key, value], index) => {              
                if (index > 0) {
                    series_list.push({
                        name: key,
                        type: 'line',
                        smooth: 'true',
                        data: value,
                    })
                }
            })

            const chart_options = {
                tooltip : {
                    trigger: 'axis'
                },
                grid: {
                    top: 8,
                    right: 8,
                    bottom: 24,
                    left: 36,
                },
                xAxis: xAxis,
                yAxis : [
                    {
                        type : 'value',
                        min: findMinFromSeriesList(series_list),
                    }
                ],
                series: series_list,
            }

            
            setChartOptions(chart_options)
        })

        socket.emit('load-data-from-data-file', JSON.stringify({ filename: filename }));
    }, [])
    
    return (
        <Card title={filename}>
            <ReactECharts 
                option={chartOptions}
                style={{ height: 240 }}
                notMerge={true}
            />
        </Card>
    );
}

export default Chart;