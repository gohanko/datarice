import React from 'react';
import { Button, Modal, Select, Space, Typography, Col, Row } from 'antd';

const { Text } = Typography;

type ChartSettingsProps = {
    chart_options: object,
    setChartOptions: Function,
    isChartSettingsOpen: boolean,
    setIsChartSettingsOpen: Function
}

const ChartSettings = ({ chart_options, setChartOptions, isChartSettingsOpen, setIsChartSettingsOpen }: ChartSettingsProps) => {
    const updateChartOptions = () => {
        
    }

    return (
        <Modal
            title={'Chart Settings - Filname.TxT'}
            open={isChartSettingsOpen}
            footer={[
                <Button key="submit" type="primary" onClick={() => setIsChartSettingsOpen(false)}>
                    Submit
                </Button>,
            ]}
            onCancel={() => setIsChartSettingsOpen(false)}
        >
            <Space direction='vertical'>
                <Row gutter={[16, 16]} align={'middle'}>
                    <Col span={8}>
                        <Text>X Axis: </Text>
                    </Col>
                    <Col span={16}>
                        <Select
                            defaultValue="lucy"
                            style={{ width: 120 }}
                            onChange={updateChartOptions}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                                { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={[16, 16]} align={'middle'}>
                    <Col span={8}>
                        <Text>Y Axis: </Text>
                    </Col>
                    <Col span={16}>
                        <Select
                            defaultValue="lucy"
                            style={{ width: 120 }}
                            onChange={updateChartOptions}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                                { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    </Col>
                </Row>
            </Space>

        </Modal>
    )
}

export default ChartSettings