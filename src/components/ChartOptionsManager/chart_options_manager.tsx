import { DEFAULT_CHART_OPTIONS } from "../../common/constants"
import dayjs from 'dayjs';


const ChartOptionsManager = () => {
    const default_options = DEFAULT_CHART_OPTIONS

    /**
     * Converts data to a 2D table.
     */
    const _convert_data_to_2D_table = (data) => {
        const dataset = []
        dataset.push(Object.keys(data['data']))

        const rows = []
        Object.keys(data['data']).forEach((key) => {
            data['data'][key].forEach((value, index) => {
                if (!rows[index]) {
                    rows[index] = []
                }

                rows[index].push(value)
            })
        })

        dataset.push(...rows)
        return dataset
    }

    const set_data = (data) => {
        const filename = data.filename
        const dataset = _convert_data_to_2D_table(data)

        const chart_options = {
            ...default_options,
            title: {
                text: filename,
            },
            dataset: {
                source: dataset
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    formatter: ((value) => {
                        const date = dayjs(value, 'MMM D')

                        if (date.isValid()) {
                            return date
                        }

                        return value
                    })
                }
            },
            yAxis: {
                min: 24
            },
            series: [...Array(dataset[0].length - 1)].map(() => ({
                type: 'line'
            })),
        }

        return chart_options
    }

    return {
        set_data
    }
}

export default ChartOptionsManager