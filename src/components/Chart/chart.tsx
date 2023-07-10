import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ChartOptions from './chart_options';
import ChartSettings from '../ChartSettings';

type ChartProps = {
    index: number,
    file_list: Array<string>
    is_chart_settings_open: boolean,
    remove_chart: Function,
}

const Chart = ({ index, file_list, is_chart_settings_open, remove_chart }: ChartProps) => {
    const [chartOptions, setChartOptions] = useState({});
    const [selectedFilename, setSelectedFilename] = useState()
    const [isChartSettingsOpen, setIsChartSettingsOpen] = useState(is_chart_settings_open);
    
    const chart_options = ChartOptions()

    useEffect(() => {
        const socket = io();
        socket.on('load-data-from-data-file', (data) => {
            if (data.filename != selectedFilename) {
                return
            }

            const options = chart_options.get_options(data)
            setChartOptions(chartOptions => ({
                ...chartOptions,
                ...options,
            }))
        })

        if (selectedFilename) {
            socket.emit('load-data-from-data-file', JSON.stringify({ filename: selectedFilename }));
        }
    }, [selectedFilename])

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
                file_list={file_list}
                isChartSettingsOpen={isChartSettingsOpen}
                setIsChartSettingsOpen={setIsChartSettingsOpen}
                setSelectedFilename={setSelectedFilename}
                title={selectedFilename}
                index={index}
                remove_chart={remove_chart}
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