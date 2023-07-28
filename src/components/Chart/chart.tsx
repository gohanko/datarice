import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ChartOptionManager from '../../helpers/frontend/EChartOptionManager';
import ChartSettings from '../ChartSettings';
import { DEFAULT_CHART_OPTIONS } from "../../common/constants"
import styles from './chart.module.css'

type ChartProps = {
    chart_id: number
    data_url: string
    chart_type: string
    is_settings_open: boolean
}

const Chart = ({
    chart_id,
    data_url,
    chart_type,
    is_settings_open,
}: ChartProps) => {
    const [chartOption, setChartOption] = useState({ ...DEFAULT_CHART_OPTIONS })
    const [rawData, setRawData] = useState({
        metadata: {
            filename: '',
            ext: '',
            mime: '',
        },
        content: ''
    })
    const [isSettingsOpen, setIsSettingsOpen] = useState(is_settings_open);
    const chart_option_manager = ChartOptionManager()
    const socket = io();

    socket.on('load-data-from-data-file', (data) => {
        if (data.metadata.filename != data_url) {
            return
        }

        setRawData(data)
    })

    useEffect(() => {
        chart_option_manager.setOption(rawData.metadata.filename, chart_type, rawData)
        setChartOption(chartOption => ({
            ...chartOption,
            ...chart_option_manager.getOption(),
        }))
    }, [rawData])

    useEffect(() => {
        if (data_url) {
            const payload = {
                data_url: data_url
            }
            socket.emit('load-data-from-data-file', JSON.stringify(payload));
        }
    }, [data_url])

    useEffect(() => {
        chart_option_manager.setOption(rawData.metadata.filename, chart_type, rawData)

        setChartOption(chartOption => ({
            ...chartOption,
            ...chart_option_manager.getOption(),
        }))
    }, [chart_type])

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
                isSettingsOpen={isSettingsOpen}
                setIsSettingsOpen={toggleChartSettings}
                data_url={data_url}
                chartType={chart_type}
                title={data_url ? data_url : 'Create New Chart'}
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
