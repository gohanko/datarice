import React from 'react'
import LineChartConfigurator from './LineChartConfigurator'

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
            { chartType == 'line' &&
                <LineChartConfigurator dataset_column={dataset_column} />
            }
        </React.Fragment>
    )
}

export default ChartConfigurator
