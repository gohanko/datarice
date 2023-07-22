import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ChartOptions from './chart_options';
import ChartSettings from '../ChartSettings';
import styles from './chart.module.css'

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

    useEffect(() => {
        if (selectedFilename) {
            socket.emit('load-data-from-data-file', JSON.stringify({ filename: selectedFilename }));
        }
    }, [selectedFilename])

    const toggleChartSettings = () => {
        setIsChartSettingsOpen(!isChartSettingsOpen)
    }

    return (
        <Card
            actions={[
                <SettingOutlined
                    key="setting"
                    onClick={toggleChartSettings}
                />,
              ]}
        >
            <ChartSettings
                file_list={file_list}
                isChartSettingsOpen={isChartSettingsOpen}
                setIsChartSettingsOpen={toggleChartSettings}
                selectedFilename={selectedFilename}
                setSelectedFilename={setSelectedFilename}
                title={selectedFilename ? selectedFilename : 'Create New Chart'}
                index={index}
                remove_chart={remove_chart}
            />
            <ReactECharts 
                option={chartOptions}
                className={styles.echarts}
                notMerge={true}
            />
        </Card>
    );
}

export default Chart;