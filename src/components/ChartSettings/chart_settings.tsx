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
            onCancel={() => {
                setIsChartSettingsOpen(false)
            }}
            footer={[
                <Button
                    key="delete"
                    type="primary"
                    danger={true}
                    onClick={() => {
                        remove_chart(index)
                        setIsChartSettingsOpen(false)
                    }}
                >
                    Delete
                </Button>,
                <Button
                    key="submit"
                    htmlType='submit'
                    type="primary"
                    onClick={() => {
                        form.submit()
                        setIsChartSettingsOpen(false)
                    }}
                >
                    Submit
                </Button>,
            ]}
        >
            <Form
                form={form}
                onFinish={(values) => {
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
                        onChange={(value) => {
                            setSelectedFilename(value);
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChartSettings