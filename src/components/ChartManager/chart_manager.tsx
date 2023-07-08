import React, { useState, useEffect } from 'react';
import { Space, Col, Row, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { io } from "socket.io-client";
import Chart from '../Chart';
import ChartSettings from '../ChartSettings';
import { DEFAULT_CHART_TYPE_SIZES } from '../../common/constants'

type ChartObject = {
    filename: string,
    type: string,
    size: number,
    component: React.JSX.Element
}

const ChartManager = () => {
    const [chartList, setChartList] = useState<ChartObject[] | []>([])
    const [fileList, setFileList] = useState([])
    const [isAddChartModalOpen, setIsAddChartModalOpen] = useState(false)

    const _create_chart = (filename) => {
        const chart_list: ChartObject[] = chartList

        const chart = {
            filename: filename,
            type: 'line',
            size: DEFAULT_CHART_TYPE_SIZES['line'],
            component: <Chart filename={filename} />
        }

        chart_list.push(chart)
        setChartList(chart_list)
    }

    const generateAllCharts = (file_list) => {
        file_list.forEach(filename => {
            _create_chart(filename)
        })
    }

    useEffect(() => {
        fetch('/api/temperature_data').finally(() => {
            const socket = io();

            socket.on('connect', () => {
                socket.emit('list-existing-data-files')
            })
    
            socket.on('list-existing-data-files', (file_list) => {
                setFileList(file_list)
            })
        })
    }, [])

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row gutter={[16, 16]}>
                { chartList.map((chart, index) => <Col span={chart.size} key={index}>{chart.component}</Col>)}
            </Row>

            <FloatButton
                icon={<PlusOutlined />}
                onClick={() => { setIsAddChartModalOpen(!isAddChartModalOpen) }}
            />
            <ChartSettings
                file_list={fileList}
                isChartSettingsOpen={isAddChartModalOpen}
                setIsChartSettingsOpen={setIsAddChartModalOpen}
                createChart={_create_chart}
                title={"Add New Chart"}
            />
        </Space>
    );
}

export default ChartManager;