import React, { useState, useEffect } from 'react';
import { Space, Col, Row } from 'antd';
import { io } from "socket.io-client";
import Chart from '../Chart';
import { DEFAULT_CHART_TYPE_SIZES } from '../../common/constants'

type ChartObject = {
    filename: string,
    type: string,
    size: number,
    component: React.JSX.Element
}

const ChartManager = () => {
    const [chartList, setChartList] = useState<ChartObject[] | []>([])

    const initializeChartList = (file_list) => {
        const chart_list: ChartObject[] = []

        file_list.forEach(filename => {
            const chart = {
                filename: filename,
                type: 'line',
                size: DEFAULT_CHART_TYPE_SIZES['line'],
                component: <Chart filename={filename} />
            }

            chart_list.push(chart);
        })

        setChartList(chart_list);
    }

    useEffect(() => {
        fetch('/api/temperature_data').finally(() => {
            const socket = io();

            socket.on('connect', () => {
                socket.emit('list-existing-data-files')
            })
    
            socket.on('list-existing-data-files', (file_list) => {
                initializeChartList(file_list)
            })
        })
    }, [])

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row gutter={[16, 16]}>
                { chartList.map((chart, index) => <Col span={chart.size} key={index}>{chart.component}</Col>)}
            </Row>
        </Space>
    );
}

export default ChartManager;