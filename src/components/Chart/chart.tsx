import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import dayjs from 'dayjs';
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ChartSettings from './chart_settings';
import { DEFAULT_CHART_OPTIONS } from '../../common/constants'

/**
 * Converts data to a 2D table.
 */
const convert_data_to_2D_table = (data) => {
    const dataset = []
    dataset.push(Object.keys(data['data']))

    const rows = []
    Object.keys(data['data']).forEach((key) => {
        data['data'][key].forEach((value, index) => {
            if (!rows[index]) {
                rows[index] = []
            }

            rows[index].push(value)
        })
    })

    dataset.push(...rows)
    return dataset
}

type ChartProps = {
    filename: string
}

const Chart = ({ filename }: ChartProps) => {
    const [chartOptions, setChartOptions] = useState({});
    const [isChartSettingsOpen, setIsChartSettingsOpen] = useState(false);

    const intiializeChartOptions = (data) => {
        if (data.filename != filename) {
            return
        }

        const source = convert_data_to_2D_table(data)
        const chart_options = {
            ...DEFAULT_CHART_OPTIONS,
            title: {
                text: filename,
            },
            dataset: {
                source: source
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    formatter: ((value) => {
                        return dayjs(value).format('MMM D')
                    })
                }
            },
            yAxis: {
                min: 24
            },
            series: [...Array(source[0].length - 1)].map(() => ({
                type: 'line'
            })),
        };

        return chart_options
    }

    useEffect(() => {
        const socket = io();
        socket.on('load-data-from-data-file', (data) => {
            const chart_options = intiializeChartOptions(data);
            setChartOptions(chart_options)
        })

        socket.emit('load-data-from-data-file', JSON.stringify({ filename: filename }));
    }, [])

    return (
        <Card
            actions={[
                <SettingOutlined
                    key="setting"
                    onClick={() => setIsChartSettingsOpen(!isChartSettingsOpen)}
                />,
              ]}
        >
            <ChartSettings
                chart_options={chartOptions}
                setChartOptions={setChartOptions}
                isChartSettingsOpen={isChartSettingsOpen}
                setIsChartSettingsOpen={setIsChartSettingsOpen}
            />
            <ReactECharts 
                option={chartOptions}
                style={{ height: 240 }}
                notMerge={true}
            />
        </Card>
    );
}

export default Chart;