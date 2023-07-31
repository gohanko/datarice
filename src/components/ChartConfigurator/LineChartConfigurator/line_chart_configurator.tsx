import { Divider, Form, Select } from 'antd'
import React from 'react'

const LineChartConfigurator = () => {



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
                <Select />
            </Form.Item>
        </React.Fragment>
    )
}

export default LineChartConfigurator
