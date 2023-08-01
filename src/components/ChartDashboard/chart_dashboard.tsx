import React, { useEffect } from 'react';
import { Space, Col, Row, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { io } from "socket.io-client";
import Chart from '../Chart';
import useChartList from '../../stores/chart_list/chart_list';
import useFileList from '../../stores/file_list';
import DataParsing from '../../helpers/data_parsing';

const ChartDashboard = () => {
    const {
        chart_list,
        addChart,
    } = useChartList()

    const setFileList = useFileList((state) => state.setFileList)
    const setFileContent = useFileList((state) => state.setFileContent)
    
    useEffect(() => {
        fetch('/api/temperature_data').finally(() => {
            const socket = io();
            
            socket.on('connect', () => {
                socket.emit('list-existing-data-files')
            })
            
            socket.on('list-existing-data-files', (file_list) => {
                setFileList(file_list)
            })

            socket.on('load-data-from-data-file', (data) => {
                const new_content = DataParsing.parseData(data)
                data.content = new_content
                setFileContent(data.metadata.filename, data)
            })
        })
    }, [])
    
    const handleOnClickFloat = () => {
        addChart({ data_url: '' })
    }

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row gutter={[16, 16]}>
                { chart_list.map((chart, index) => {
                    return <Col span={12} key={index}>
                        <Chart
                            id={chart.id}
                            data_url={chart.data_url}
                            chart_setting={chart.chart_setting}
                        />
                    </Col>
                })}
            </Row>

            <FloatButton
                icon={<PlusOutlined />}
                onClick={handleOnClickFloat}
            />
        </Space>
    );
}

export default ChartDashboard;
