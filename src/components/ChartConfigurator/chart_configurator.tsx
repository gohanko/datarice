import React from 'react'
import { SUPPORTED_CHART_TYPES } from '../../constants'
import CartesianPlaneConfigurator from './CartesianPlaneConfigurator'

interface ChartConfiguratorProps {
    chartType: string
    dataset_column: Array<string>
}

const ChartConfigurator = ({
    chartType,
    dataset_column
}: ChartConfiguratorProps) => {
    return (
        <React.Fragment>
            { (chartType == SUPPORTED_CHART_TYPES[0] || chartType == SUPPORTED_CHART_TYPES[3] || chartType == SUPPORTED_CHART_TYPES[4]) &&
                <CartesianPlaneConfigurator dataset_column={dataset_column} />
            }
        </React.Fragment>
    )
}

export default ChartConfigurator
