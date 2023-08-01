import React, { useEffect } from 'react';
import { Space, Col, Row, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { io } from "socket.io-client";
import Chart from '../Chart';
import useChartList from '../../stores/chart_list/chart_list';
import useFileList from '../../stores/file_list/file_list';
import DataParsing from '../../helpers/data_parsing';
import * as chart_list_selectors from '../../stores/chart_list/selectors';
import * as file_list_selectors from '../../stores/file_list/selectors';

const ChartDashboard = () => {
    const chart_list = useChartList(chart_list_selectors.chart_list)
    const addChart = useChartList(chart_list_selectors.addChart)

    const setFileList = useFileList(file_list_selectors.setFileList)
    const setFileData = useFileList(file_list_selectors.setFileData)
    
    useEffect(() => {
        fetch('/api/temperature_data').finally(() => {
            const socket = io();
            
            socket.on('connect', () => {
                socket.emit('list-existing-data-files')
            })
            
            socket.on('list-existing-data-files', (file_list) => {
                setFileList(file_list)
            })

            socket.on('load-data-from-data-file', (fileData) => {
                const newFileData = DataParsing.parseFileData(fileData)
                console.log('inside load-data-from-data-file: ', newFileData)
                setFileData(newFileData)
            })
        })
    }, [])
    
    const handleOnClickFloat = () => addChart({ data_url: '' })

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row gutter={[16, 16]}>
                { chart_list.map((chart, index) => (
                    <Col span={12} key={index}>
                        <Chart
                            id={chart.id}
                            data_url={chart.data_url}
                            chart_setting={chart.chart_setting}
                        />
                    </Col>
                ))}
            </Row>

            <FloatButton
                icon={<PlusOutlined />}
                onClick={handleOnClickFloat}
            />
        </Space>
    );
}

export default ChartDashboard;
