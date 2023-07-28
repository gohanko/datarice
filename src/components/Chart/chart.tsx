import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ChartOptionManager from '../../helpers/EChartOptionManager';
import ChartSettings from '../ChartSettings';
import { ChartType } from '../../types/chart';
import { DEFAULT_CHART_OPTIONS } from "../../constants"
import styles from './chart.module.css'

const Chart = ({
    id,
    data_url,
    chart_setting,
}: ChartType) => {
    const [chartOption, setChartOption] = useState({ ...DEFAULT_CHART_OPTIONS })
    const [isSettingsOpen, setIsSettingsOpen] = useState(!data_url)
    const [rawData, setRawData] = useState({
        metadata: {
            filename: '',
            ext: '',
            mime: '',
        },
        content: ''
    })

    const chart_option_manager = ChartOptionManager()
    
    const socket = io();
    socket.on('load-data-from-data-file', (data) => {
        if (data.metadata.filename != data_url) {
            return
        }

        setRawData(data)
    })

    const loadDataIntoOptions = (data) => {
        chart_option_manager.setOption(data.metadata.filename, chart_setting.chart_type, data)

        setChartOption(chartOption => ({
            ...chartOption,
            ...chart_option_manager.getOption(),
        }))
    }

    const toggleChartSettings = () => setIsSettingsOpen(!isSettingsOpen)

    useEffect(() => {
        if (data_url) {
            const payload = {
                data_url: data_url
            }
            socket.emit('load-data-from-data-file', JSON.stringify(payload));
        }
    }, [data_url])

    useEffect(() => {
        loadDataIntoOptions(rawData)
    }, [rawData])

    useEffect(() => {
        loadDataIntoOptions(rawData)
    }, [chart_setting.chart_type])

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
                chart_id={id}
                isSettingsOpen={isSettingsOpen}
                setIsSettingsOpen={toggleChartSettings}
                data_url={data_url}
                chartType={chart_setting.chart_type}
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
