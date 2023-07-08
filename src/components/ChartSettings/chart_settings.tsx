import React, { useState, useEffect } from 'react';
import { Button, Modal, Select, Space, Typography, Col, Row } from 'antd';

const { Text } = Typography;

type ChartSettingsProps = {
    file_list: Array<string>,
    isChartSettingsOpen: boolean,
    setIsChartSettingsOpen: Function,
    createChart: Function,
    title: string
}

const ChartSettings = ({ file_list, isChartSettingsOpen, setIsChartSettingsOpen, createChart, title }: ChartSettingsProps) => {
    const [selectedFilename, setSelectedFilename] = useState()

    return (
        <Modal
            title={title}
            open={isChartSettingsOpen}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
                        createChart(selectedFilename)
                        setIsChartSettingsOpen(false)
                    }}
                >
                    Submit
                </Button>,
            ]}
            onCancel={() => setIsChartSettingsOpen(false)}
        >
            <Space direction='vertical'>
                <Row gutter={[16, 16]} align={'middle'}>
                    <Col span={8}>
                        <Text>Filename: </Text>
                    </Col>
                    <Col span={16}>
                        <Select
                            style={{ width: 120 }}
                            options={file_list.map(file => ({
                                value: file,
                                label: file
                            }))}
                            onChange={(value) => {
                                setSelectedFilename(value)
                            }}
                        />
                    </Col>
                </Row>
            </Space>
        </Modal>
    )
}

export default ChartSettings