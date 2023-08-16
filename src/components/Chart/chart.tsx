import React, { useState, useEffect, useRef, Ref, RefAttributes } from 'react';
import ReactECharts from 'echarts-for-react';
import { io } from "socket.io-client";
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { ECharts } from 'echarts';
import ChartSettings from '../ChartSettings';
import { ChartType } from '../../types/chart';
import { DEFAULT_CHART_OPTIONS } from "../../constants"
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
    const [echartsInstance, setEChartsInstance] = useState<ECharts>()
    const fileData = useFileList((state) => getFileData(dataUrl, state.file_data_list))
    const setCurrentX = useChartList(selectors.setCurrentX)

    const echartsRef = useRef<any>()

    const toggleChartSettings = () => setIsSettingsOpen(!isSettingsOpen)

    const createSeries = (column_header) => {
        if (chartSetting.chartType == 'pie') {
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

    const getDataset = () => JSON.parse(JSON.stringify(fileData?.content || []))

    const setOption = (options) => {
        const newOptions = JSON.parse(JSON.stringify(options))

        const replaceMerge = []

        if (chartSetting.chartType == 'pie') {
            replaceMerge.push('series')
            replaceMerge.push('dataZoom')
        } else {
            newOptions['dataZoom'] = [
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

        echartsInstance.setOption(newOptions, { replaceMerge })
    }

    useEffect(() => {
        if (!echartsInstance && echartsRef.current) {
            setEChartsInstance(echartsRef.current.getEchartsInstance())
        }
    }, [])

    useEffect(() => {
        if (!dataUrl) {
            return
        }

        const socket = io();
        socket.emit('load-data-from-data-file', JSON.stringify({ dataUrl }))
    }, [dataUrl])

    useEffect(() => {
        const dataset = getDataset()
        if (dataset.length == 0 || !echartsInstance) {
            return
        }

        if (!chartSetting.currentX) {
            setCurrentX(id, dataset[0][0])
        }

        const series = createSeries(dataset[0])
        setOption({
            title: {
                text: dataUrl
            },
            dataset: {
                source: dataset
            },
            series: series
        })
    }, [fileData])

    useEffect(() => {
        const dataset = getDataset()
        if (dataset.length == 0 || !echartsInstance) {
            return
        }

        const series = createSeries(dataset[0])
        setOption({ series: series })
    }, [chartSetting.chartType, chartSetting.currentX])

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
                ref={echartsRef}
                option={JSON.parse(JSON.stringify(DEFAULT_CHART_OPTIONS))}
            />
        </Card>
    );
}

export default Chart;
