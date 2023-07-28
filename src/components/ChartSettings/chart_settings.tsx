import React from 'react';
import {
    Button,
    Modal,
    Select,
    Form,
    Divider
} from 'antd';
import { SUPPORTED_CHART_TYPES } from '../../constants';
import useChartList from '../../stores/chart_list';
import useFileList from '../../stores/file_list';
import { createItemAndLabel } from '../../helpers/random';

type ChartSettingsProps = {
    chart_id: number,
    isSettingsOpen: boolean,
    setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    data_url: string,
    chartType: string,
    title: string,
}

const ChartSettings = ({
    chart_id,
    isSettingsOpen,
    setIsSettingsOpen,
    data_url,
    chartType,
    title,
}: ChartSettingsProps) => {
    const setDataURL = useChartList((state) => state.setDataURL)
    const setChartType = useChartList((state) => state.setChartType)
    const removeChart = useChartList((state) => state.removeChart)
    const file_list = useFileList((state) => state.file_list)
    
    const [form] = Form.useForm();
    const select_options = createItemAndLabel(file_list)
    const chart_type_options = createItemAndLabel(SUPPORTED_CHART_TYPES, true)

    const onDelete = () => {
        removeChart(chart_id)
        setIsSettingsOpen(false)
    }

    const onCancel = () => {
        setIsSettingsOpen(false)
    }

    const onSubmit = () => form.submit()

    const onFormFinished = (form_value) => {
        const filename = form_value?.filename
        if (filename) {
            setDataURL(chart_id, filename)
        }

        const chart_type = form_value?.chart_type
        if (chart_type) {
            setChartType(chart_id, chart_type)
        }

        setIsSettingsOpen(false)
    }

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
                initialValues={{
                    ["filename"]: data_url,
                    ["chart_type"]: chartType
                }}
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
                { data_url &&
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
