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
    index: number,
    file_list: Array<string>,
    isChartSettingsOpen: boolean,
    setIsChartSettingsOpen: Function,
    setSelectedFilename: Function,
    title: string,
    remove_chart: Function,
}

const ChartSettings = ({ index, file_list, isChartSettingsOpen, setIsChartSettingsOpen, setSelectedFilename, title, remove_chart }: ChartSettingsProps) => {
    const [form] = Form.useForm();
    
    return (
        <Modal
            title={title}
            open={isChartSettingsOpen}
            okText="Create"
            cancelText="Cancel"
            onOk={form.submit}
            onCancel={() => {
                setIsChartSettingsOpen(false)
                remove_chart(index)
            }}
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