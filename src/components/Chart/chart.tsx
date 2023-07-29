import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ChartSettings from '../ChartSettings';
import { ChartType } from '../../types/chart';
import { DEFAULT_CHART_OPTIONS } from "../../constants"
import DataParsing from '../../helpers/data_parsing';
import styles from './chart.module.css'

const Chart = ({
    id,
    data_url,
    chart_setting,
}: ChartType) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(!data_url)
    const [dataset, setDataset] = useState([])
    const [chartOption, setChartOption] = useState({ ...DEFAULT_CHART_OPTIONS })

    const socket = io();
    socket.on('load-data-from-data-file', (data) => {
        if (data.metadata.filename != data_url) {
            return
        }

        const new_dataset = DataParsing.parseData(data)
        setDataset(new_dataset)
    })
    
    const toggleChartSettings = () => setIsSettingsOpen(!isSettingsOpen)

    const createSeries = (column_header) => column_header.slice(1).map(() => ({
        type: chart_setting.chart_type
    }))

    useEffect(() => {
        if (dataset.length == 0) {
            return
        }

        const series = createSeries(dataset[0])
        setChartOption(chartOption => ({
            ...chartOption,
            dataset: {
                source: dataset
            },
            series: series
        }))
    }, [dataset])

    useEffect(() => {
        if (data_url) {
            const payload = {
                data_url: data_url
            }

            socket.emit(
                'load-data-from-data-file',
                JSON.stringify(payload)
            )
        }
    }, [data_url])

    useEffect(() => {
        if (dataset.length == 0) {
            return
        }

        const series = createSeries(dataset[0])
        setChartOption(chartOption => ({
            ...chartOption,
            series: series
        }))
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
