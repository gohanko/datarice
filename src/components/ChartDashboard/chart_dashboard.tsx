import React, { useState, useEffect } from 'react';
import { Space, Col, Row, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { io } from "socket.io-client";
import Chart from '../Chart';
import { DEFAULT_CHART_TYPE_SIZES } from '../../common/constants'

type ChartObject = {
    type: string,
    size: number,
    component: React.JSX.Element
}

const ChartDashboard = () => {
    const [chartList, setChartList] = useState<ChartObject[] | []>([])
    const [fileList, setFileList] = useState([])

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

    const _create_chart = () => {
        const chart_list: ChartObject[] = [...chartList]

        const chart = {
            type: 'line',
            size: DEFAULT_CHART_TYPE_SIZES['line'],
            component: <Chart
                chart_id={chart_list.length}
                file_list={fileList}
                is_settings_open={true} // NOTE: Always open when created for the first time.
                remove_chart={_remove_chart}
            />
        }

        chart_list.push(chart)
        setChartList(chart_list)
    }

    const _remove_chart = (index) => {
        const chart_list: ChartObject[] = [...chartList]
        chart_list.splice(index, 1)
        setChartList(chart_list)
    }

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row gutter={[16, 16]}>
                { chartList.map((chart, index) => <Col span={chart.size} key={index}>{chart.component}</Col>)}
            </Row>

            <FloatButton
                icon={<PlusOutlined />}
                onClick={_create_chart}
            />
        </Space>
    );
}

export default ChartDashboard;