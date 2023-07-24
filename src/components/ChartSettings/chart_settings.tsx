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
import { SUPPORTED_CHART_TYPES } from '../../common/constants';

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

    const onSubmit = () => form.submit()

    const onFormFinished = (form_value) => {
        console.log(form_value)
        setSelectedFilename(form_value['filename'])
        setIsSettingsOpen(false)
    }

    const generateListAndLabel = (values) => {
        return values.map(value => ({
            value: value,
            label: value
        }))
    }

    const select_options = generateListAndLabel(file_list)
    const chart_type_options = generateListAndLabel(SUPPORTED_CHART_TYPES)

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
                        allowClear={true}
                        showSearch={true}
                    />
                </Form.Item>
                { selectedFilename &&
                    <React.Fragment>
                        <Divider
                            orientation='left'
                            orientationMargin={0}
                            plain
                        >
                            Chart Settings
                        </Divider>
                        <Form.Item
                            name={'chart_type'}
                            label={'Chart Type'}
                        >
                            <Select
                                options={chart_type_options}
                            />
                        </Form.Item>
                    </React.Fragment>
                }
            </Form>
        </Modal>
    )
}

export default ChartSettings