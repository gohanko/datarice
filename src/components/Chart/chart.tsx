import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ChartOptionManager from './chart_option_manager';
import ChartSettings from '../ChartSettings';
import styles from './chart.module.css'
import { DEFAULT_CHART_OPTIONS, SUPPORTED_CHART_TYPES } from "../../common/constants"


type ChartProps = {
    chart_id: number,
    file_list: Array<string>
    is_settings_open: boolean,
    remove_chart: Function,
}

const Chart = ({
    chart_id,
    file_list,
    is_settings_open,
    remove_chart
}: ChartProps) => {
    const [chartOption, setChartOption] = useState({ ...DEFAULT_CHART_OPTIONS })
    const [selectedFilename, setSelectedFilename] = useState()
    const [rawData, setRawData] = useState({
        filename: '',
        data: []
    })
    const [isSettingsOpen, setIsSettingsOpen] = useState(is_settings_open);
    const [chartType, setChartType] = useState(SUPPORTED_CHART_TYPES['0'])

    const chart_option_manager = ChartOptionManager()
    const socket = io();

    socket.on('load-data-from-data-file', (data) => {
        if (data.filename != selectedFilename) {
            return
        }

        setRawData(data)
    })

    useEffect(() => {
        chart_option_manager.setOption(rawData['filename'], chartType, rawData['data'])
        setChartOption(chartOption => ({
            ...chartOption,
            ...chart_option_manager.getOption(),
        }))
    }, [rawData])

    useEffect(() => {
        if (selectedFilename) {
            socket.emit('load-data-from-data-file', JSON.stringify({ filename: selectedFilename }));
        }
    }, [selectedFilename])

    useEffect(() => {
        chart_option_manager.setOption(rawData.filename, chartType, rawData['data'])

        setChartOption(chartOption => ({
            ...chartOption,
            ...chart_option_manager.getOption(),
        }))
    }, [chartType])

    const toggleChartSettings = () => setIsSettingsOpen(!isSettingsOpen)

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
                chart_id={chart_id}
                file_list={file_list}
                isSettingsOpen={isSettingsOpen}
                setIsSettingsOpen={toggleChartSettings}
                selectedFilename={selectedFilename}
                setSelectedFilename={setSelectedFilename}
                chartType={chartType}
                setChartType={setChartType}
                title={selectedFilename ? selectedFilename : 'Create New Chart'}
                remove_chart={remove_chart}
            />
            <ReactECharts 
                option={chartOption}
                className={styles.echarts}
                notMerge={true}
            />
        </Card>
    );
}

export default Chart;