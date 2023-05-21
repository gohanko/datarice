import React, { useState, useEffect } from 'react';
import { Space, Col, Row } from 'antd';
import { io } from "socket.io-client";
import Chart from './chart';

const ChartCollection = () => {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        fetch('/api/temperature_data').finally(() => {
            const socket = io();

            socket.on('connect', () => {
                socket.emit('list-existing-data-files')
            })
    
            socket.on('list-existing-data-files', (data) => {
                setFileList(data);
            })
        })
    }, [])

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row gutter={[16, 16]}>
            { fileList.map((filename, index) => 
                (<Col span={12}>
                    <Chart key={index} filename={filename} />
                </Col>))}
            </Row>
        </Space>
    );
}

export default ChartCollection;