import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ChartSettings from '../ChartSettings';
import { ChartType } from '../../types/chart';
import { DEFAULT_CHART_OPTIONS } from "../../constants"
import useFileList from '../../stores/file_list/file_list';
import { getFileData } from '../../stores/file_list/helpers';
import styles from './chart.module.css'

const Chart = ({
    id,
    data_url,
    chart_setting,
}: ChartType) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(!data_url)
    const [chartOption, setChartOption] = useState({ ...DEFAULT_CHART_OPTIONS })
    const [currentX, setCurrentX] = useState('')

    const file_data_list = useFileList((state) => state.file_data_list)

    const toggleChartSettings = () => setIsSettingsOpen(!isSettingsOpen)

    const createSeries = (column_header) => {
        if (chart_setting.chart_type == 'pie') {
            return {
                type: chart_setting.chart_type,
            }
        }

        return column_header
            .filter((header) => header != currentX)
            .map((header) => ({
                type: chart_setting.chart_type,
                name: header,
                encode: {
                    x: currentX,
                    y: header
                },
            }))
    }

    const getDatasetColumn = () => {
        const dataset = getFileData(
            data_url,
            file_data_list
        ).content
        if (dataset.length == 0) {
            return []
        }

        return dataset[0]
    }

    useEffect(() => {
        if (!data_url) {
            return
        }

        const payload = {
            data_url: data_url
        }

        const socket = io();
        socket.emit(
            'load-data-from-data-file',
            JSON.stringify(payload)
        )
    }, [data_url])

    useEffect(() => {
        const dataset = getFileData(data_url, file_data_list).content
        if (dataset.length == 0) {
            return
        }

        if (!currentX) {
            setCurrentX(dataset[0][0])
        }

        const series = createSeries(dataset[0])
        setChartOption(chartOption => ({
            ...chartOption,
            title: {
                text: data_url
            },
            dataset: {
                source: dataset
            },
            series: series
        }))
    }, [file_data_list])

    useEffect(() => {
        const dataset = getFileData(data_url, file_data_list).content
        if (dataset.length == 0) {
            return
        }

        const series = createSeries(dataset[0])
        setChartOption(chartOption => ({
            ...chartOption,
            series: series
        }))
    }, [chart_setting.chart_type, currentX])

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
                dataset_column={getDatasetColumn()}
                currentX={currentX}
                setCurrentX={setCurrentX}
                data_url={data_url}
                chartType={chart_setting.chart_type}
                title={data_url ? data_url : 'Create New Chart'}
            />
            <ReactECharts
                notMerge={true}
                option={chartOption}
                className={styles.echarts}
            />
        </Card>
    );
}

export default Chart;
