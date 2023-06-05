import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ChartSettings from './chart_settings';
import ChartOptionsManager from '../ChartOptionsManager';

type ChartProps = {
    filename: string
}

const Chart = ({ filename }: ChartProps) => {
    const [chartOptions, setChartOptions] = useState({});
    const [isChartSettingsOpen, setIsChartSettingsOpen] = useState(false);

    const chart_options_manager = ChartOptionsManager()

    useEffect(() => {
        const socket = io();
        socket.on('load-data-from-data-file', (data) => {
            if (data.filename != filename) {
                return
            }
    
            const chart_options = chart_options_manager.set_data(data)
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