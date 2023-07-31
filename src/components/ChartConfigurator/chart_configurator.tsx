import React from 'react'
import LineChartConfigurator from './LineChartConfigurator'

interface ChartConfiguratorProps {
    chartType: string
}

const ChartConfigurator = ({
    chartType
}: ChartConfiguratorProps) => {
    return (
        <React.Fragment>
            { chartType == 'line' &&
                <LineChartConfigurator />
            }
        </React.Fragment>
    )
}

export default ChartConfigurator
