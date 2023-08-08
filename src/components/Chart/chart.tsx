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

const Chart = ({
    id,
    chartSetting,
    dataUrl,
}: ChartType) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(!dataUrl)
    const [chartOption, setChartOption] = useState({ ...DEFAULT_CHART_OPTIONS })
    const [currentX, setCurrentX] = useState('')
    const file_data_list = useFileList((state) => state.file_data_list)

    const toggleChartSettings = () => setIsSettingsOpen(!isSettingsOpen)

    const createSeries = (column_header) => {
        if (chartSetting.chartType == 'pie') {
            return {
                type: chartSetting.chartType,
            }
        }

        return column_header
            .filter((header) => header != currentX)
            .map((header) => ({
                type: chartSetting.chartType,
                name: header,
                encode: {
                    x: currentX,
                    y: header
                },
            }))
    }

    const getDatasetColumn = () => {
        const dataset = getFileData(
            dataUrl,
            file_data_list
        ).content
        if (dataset.length == 0) {
            return []
        }

        return dataset[0]
    }

    useEffect(() => {
        if (!dataUrl) {
            return
        }

        const payload = {
            dataUrl: dataUrl
        }

        const socket = io();
        socket.emit(
            'load-data-from-data-file',
            JSON.stringify(payload)
        )
    }, [dataUrl])

    useEffect(() => {
        const dataset = getFileData(dataUrl, file_data_list).content
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
                text: dataUrl
            },
            dataset: {
                source: dataset
            },
            series: series
        }))
    }, [file_data_list])

    useEffect(() => {
        const dataset = getFileData(dataUrl, file_data_list).content
        if (dataset.length == 0) {
            return
        }

        const series = createSeries(dataset[0])
        setChartOption(chartOption => ({
            ...chartOption,
            series: series
        }))
    }, [chartSetting.chartType, currentX])

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
                chartId={id}
                isSettingsOpen={isSettingsOpen}
                setIsSettingsOpen={toggleChartSettings}
                datasetColumn={getDatasetColumn()}
                currentX={currentX}
                setCurrentX={setCurrentX}
                dataUrl={dataUrl}
                chartSetting={chartSetting}
            />
            <ReactECharts
                notMerge={true}
                option={chartOption}
            />
        </Card>
    );
}

export default Chart;
