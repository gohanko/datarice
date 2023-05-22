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
            if (data.filename !== filename) {
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

            const series_list = [
                {
                    type: 'line',
                    smooth: true,
                    data: data['temperature'],
                },
            ]

            const chart_options = {
                tooltip : {
                    trigger: 'axis'
                },
                grid: { top: 8, right: 8, bottom: 24, left: 36 },
                xAxis: [
                    {
                        type: 'category',
                        data: data['date'].map((time) => (dayjs(time).format('MMM D')))
                    },
                ],
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
    }, [filename])
    
    return (
        <Card title={filename}>
            <ReactECharts 
                option={chartOptions}
                style={{ height: 240 }}
            />
        </Card>
    );
}

export default Chart;