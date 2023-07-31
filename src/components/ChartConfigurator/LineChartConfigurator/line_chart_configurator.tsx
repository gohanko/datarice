import { Divider, Form, Select } from 'antd'
import React from 'react'
import { createItemAndLabel } from '../../../helpers/random'

const LineChartConfigurator = ({
    dataset_column
}) => {
    const dataset_column_options = createItemAndLabel(dataset_column)

    return (
        <React.Fragment>
            <Divider
                orientation='left'
                orientationMargin={0}
                plain
            >
                Line Chart Configurator
            </Divider>
            <Form.Item
                name={'line_chart_x'}
                label={'X-Axis'}
            >
                <Select
                    options={dataset_column_options}
                />
            </Form.Item>
        </React.Fragment>
    )
}

export default LineChartConfigurator
