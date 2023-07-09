import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    Select,
    Space,
    Typography,
    Col,
    Row,
    Collapse
} from 'antd';

const { Text } = Typography;

type ChartSettingsProps = {
    file_list: Array<string>,
    isChartSettingsOpen: boolean,
    setIsChartSettingsOpen: Function,
    setSelectedFilename: Function,
    title: string
}

const ChartSettings = ({ file_list, isChartSettingsOpen, setIsChartSettingsOpen, setSelectedFilename, title }: ChartSettingsProps) => {
    return (
        <Modal
            title={title}
            open={isChartSettingsOpen}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
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
                    <Col span={12}>
                        <Text>Filename: </Text>
                    </Col>
                    <Col span={12}>
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
                <Row gutter={[0, 0]} align={'middle'}>
                    <Collapse
                        ghost={true}
                        items={[
                            {
                                key: 1,
                                label: "Advanced Settings",
                                children: <p>hello!</p>
                            }
                        ]}
                    />
                </Row>
            </Space>
        </Modal>
    )
}

export default ChartSettings