import React from 'react';
import {
    Button,
    Modal,
    Select,
    Form,
    Divider
} from 'antd';
import { SUPPORTED_CHART_TYPES } from '../../common/constants';
import useChartList from '../../stores/chart_list';

type ChartSettingsProps = {
    chart_id: number,
    file_list: Array<string>,
    isSettingsOpen: boolean,
    setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedFilename: string,
    setSelectedFilename: React.Dispatch<React.SetStateAction<string>>,
    chartType,
    setChartType,
    title: string,
}

const ChartSettings = ({
    chart_id,
    file_list,
    isSettingsOpen,
    setIsSettingsOpen,
    selectedFilename,
    setSelectedFilename,
    chartType,
    setChartType,
    title,
}: ChartSettingsProps) => {
    const [form] = Form.useForm();
    const removeChart = useChartList((state) => state.removeChart)

    const onDelete = () => {
        removeChart(chart_id)
        setIsSettingsOpen(false)
    }

    const onCancel = () => {
        if (!selectedFilename) {
            removeChart(chart_id)
        } else {
            setIsSettingsOpen(false)
        }
    }

    const onSubmit = () => form.submit()

    const onFormFinished = (form_value) => {
        const filename = form_value?.filename
        if (filename) {
            setSelectedFilename(filename)
        }

        const chart_type = form_value?.chart_type
        if (chart_type) {
            setChartType(chart_type)
        }

        setIsSettingsOpen(false)
    }

    const generateListAndLabel = (values, capitalise_label=false) => {
        return values.map(value => ({
            value: value,
            label: capitalise_label ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : value
        }))
    }

    const select_options = generateListAndLabel(file_list)
    const chart_type_options = generateListAndLabel(SUPPORTED_CHART_TYPES, true)

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