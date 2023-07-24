import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    Select,
    Typography,
    Form,
    Collapse,
    Divider
} from 'antd';

type ChartSettingsProps = {
    chart_id: number,
    file_list: Array<string>,
    isSettingsOpen: boolean,
    setIsSettingsOpen: Function,
    selectedFilename: string,
    setSelectedFilename: Function,
    title: string,
    remove_chart: Function,
}

const ChartSettings = ({
    chart_id,
    file_list,
    isSettingsOpen,
    setIsSettingsOpen,
    selectedFilename,
    setSelectedFilename,
    title,
    remove_chart
}: ChartSettingsProps) => {
    const [form] = Form.useForm();

    const onDelete = () => {
        remove_chart(chart_id)
        setIsSettingsOpen(false)
    }

    const onCancel = () => {
        if (!selectedFilename) {
            remove_chart(chart_id)
        } else {
            setIsSettingsOpen(false)
        }
    }

    const onSubmit = () => {
        form.submit()
        setIsSettingsOpen(false)
    }

    const onFormFinished = () => {
        setIsSettingsOpen(false)
    }

    const onFilenameSelect = (value) => {
        setSelectedFilename(value)
    }

    const generateListAndLabel = (file_list) => {
        return file_list.map(file => ({
            value: file,
            label: file
        }))
    }

    const select_options = generateListAndLabel(file_list)

    return (
        <Modal
            title={title}
            open={isSettingsOpen}
            onCancel={onCancel}
            footer={[
                <Button
                    key="delete"
                    type="primary"
                    danger={true}
                    onClick={onDelete}
                >
                    Delete
                </Button>,
                <Button
                    key="submit"
                    htmlType='submit'
                    type="primary"
                    onClick={onSubmit}
                >
                    Submit
                </Button>,
            ]}
        >
            <Form
                form={form}
                onFinish={onFormFinished}
            >
                <Form.Item
                    name={'filename'}
                    label={'Filename'}
                >
                    <Select
                        options={select_options}
                        onChange={onFilenameSelect}
                        allowClear={true}
                        showSearch={true}
                    />
                </Form.Item>
                { selectedFilename &&
                    <Form.Item>
                        <Divider
                            orientation='left'
                            orientationMargin={0}
                            plain
                        >
                            Chart Settings
                        </Divider>
                    </Form.Item>
                }
            </Form>
        </Modal>
    )
}

export default ChartSettings