import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    Select,
    Space,
    Typography,
    Col,
    Row,
    Collapse,
    Form
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
    const [form] = Form.useForm();
    
    return (
        <Modal
            title={title}
            open={isChartSettingsOpen}
            okText="Create"
            cancelText="Cancel"
            onOk={form.submit}
            onCancel={() => setIsChartSettingsOpen(false)}
        >
            <Form
                form={form}
                onFinish={(values) => {
                    setSelectedFilename(values['filename']);
                    setIsChartSettingsOpen(false)
                }}
            >
                <Form.Item
                    name={'filename'}
                    label={'Filename'}
                >
                    <Select
                        style={{ width: 120 }}
                        options={file_list.map(file => ({
                            value: file,
                            label: file
                        }))}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChartSettings