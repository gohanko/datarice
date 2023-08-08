import React from 'react';
import {
    Button,
    Modal,
    Select,
    Form,
    Divider
} from 'antd';
import { SUPPORTED_CHART_TYPES } from '../../constants';
import useChartList from '../../stores/chart_list/chart_list';
import useFileList from '../../stores/file_list/file_list';
import { createItemAndLabel } from '../../helpers/random';
import ChartConfigurator from '../ChartConfigurator';
import * as selectors from '../../stores/chart_list/selectors';
import { ChartSettingType } from '../../types/chart';

type ChartSettingsProps = {
    isSettingsOpen: boolean,
    setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    currentX: string,
    setCurrentX: (column: string) => void,
    datasetColumn: Array<string>
    chartId: number,
    dataUrl: string,
    chartSetting: ChartSettingType,
}

const ChartSettings = ({
    isSettingsOpen,
    setIsSettingsOpen,
    currentX,
    setCurrentX,
    datasetColumn,
    chartId,
    dataUrl,
    chartSetting,
}: ChartSettingsProps) => {
    const setDataURL = useChartList(selectors.setDataURL)
    const setChartType = useChartList(selectors.setChartType)
    const removeChart = useChartList(selectors.removeChart)
    const file_list = useFileList((state) => state.file_list)
    
    const [form] = Form.useForm();
    const select_options = createItemAndLabel(file_list)
    const chart_type_options = createItemAndLabel(SUPPORTED_CHART_TYPES, true)

    const onDelete = () => {
        removeChart(chartId)
        setIsSettingsOpen(false)
    }

    const onCancel = () => {
        setIsSettingsOpen(false)
    }

    const onSubmit = () => form.submit()

    const onFormFinished = (form_value) => {
        const filename = form_value?.filename
        if (filename) {
            setDataURL(chartId, filename)
        }

        const chart_type = form_value?.chart_type
        if (chart_type) {
            setChartType(chartId, chart_type)
        }

        const line_chart_x = form_value?.line_chart_x
        if (line_chart_x) {
            setCurrentX(line_chart_x)
        }

        setIsSettingsOpen(false)
    }

    return (
        <Modal
            title={dataUrl ? dataUrl : 'Create New Chart'}
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
                    ["filename"]: dataUrl,
                    ["chart_type"]: chartSetting.chartType,
                    ["line_chart_x"]: currentX,
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
                { dataUrl &&
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
                { (dataUrl && chartSetting.chartType) &&
                    <ChartConfigurator
                        chartType={chartSetting.chartType}
                        dataset_column={datasetColumn}
                    />
                }
            </Form>
        </Modal>
    )
}

export default ChartSettings
