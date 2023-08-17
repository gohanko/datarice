import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ChartSettings from '../ChartSettings';
import { ChartType } from '../../types/chart';
import { DEFAULT_CHART_OPTIONS, WS_EVENT_NAMES } from "../../constants"
import useFileList from '../../stores/file_list/file_list';
import { getFileData } from '../../stores/file_list/helpers';
import useChartList from '../../stores/chart_list/chart_list';
import * as selectors from '../../stores/chart_list/selectors';

const Chart = ({
    id,
    chartSetting,
    dataUrl,
}: ChartType) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(!dataUrl)
    const fileData = useFileList((state) => getFileData(dataUrl, state.file_data_list))
    const setCurrentX = useChartList(selectors.setCurrentX)
    const isPie = chartSetting.chartType == 'pie'

    const toggleChartSettings = () => {
        setIsSettingsOpen(!isSettingsOpen)
    }

    const createSeries = (column_header) => {
        if (isPie) {
            return {
                type: chartSetting.chartType,
            }
        }
        
        const series = column_header
            .filter((header) => header != chartSetting.currentX)
            .map((header) => {
                return {
                    type: chartSetting.chartType,
                    name: header,
                    encode: {
                        x: chartSetting.currentX || column_header[0],
                        y: header
                    },
                }
            })

        return series
    }

    const getDataset = () => {
        return JSON.parse(JSON.stringify(fileData?.content || []))
    }

    const getOption = () => {
        const dataset = getDataset()
        const series = createSeries(dataset?.[0] || [])
        const option = {
            ...JSON.parse(JSON.stringify(DEFAULT_CHART_OPTIONS)),
            title: {
                text: dataUrl
            },
            dataset: {
                source: dataset
            },
            series: series
        }

        if (!isPie) {
            option['dataZoom'] = [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                },
                {
                    type: 'slider',
                    show: true,
                    yAxisIndex: [0],
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                },
                {
                    type: 'inside',
                    yAxisIndex: [0],
                }
            ]
        }

        return option
    }

    useEffect(() => {
        if (!dataUrl) {
            return
        }

        const socket = io();
        socket.emit(WS_EVENT_NAMES.LOAD_DATA, JSON.stringify({ dataUrl }))
    }, [dataUrl])

    useEffect(() => {
        const dataset = getDataset()
        if (dataset && dataset?.[0] && dataset?.[0]?.[0]) {
            if (!dataset[0].includes(chartSetting.currentX)) {
                setCurrentX(id, dataset[0][0])
            }
        }
    }, [fileData])

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
                datasetColumn={getDataset()[0]}
                dataUrl={dataUrl}
                chartSetting={chartSetting}
            />
            <ReactECharts
                option={getOption()}
                notMerge={isPie} // Note: setting this to true will fix the issue when changing xAxis
            />
        </Card>
    );
}

export default Chart;
