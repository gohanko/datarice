import {
    DEFAULT_CHART_OPTIONS,
    SUPPORTED_CHART_TYPES,
} from "../../../common/constants";
import DataParsing from "../data_parsing";
import dayjs from 'dayjs';

const ChartOptionManager = () => {
    let title = ''
    let dataset = []
    let series = []
    let chart_type = ''

    const setChartType = (new_chart_type) => {
        if (!SUPPORTED_CHART_TYPES.includes(new_chart_type)) {
            throw 'Chart Type not suppported'
        }

        chart_type = new_chart_type
    }

    const setDataset = (new_data) => {
        dataset = DataParsing.parseData(new_data)
        console.log(dataset)
        if (dataset.length == 0) {
            series = []
        } else {
            series = dataset[0].map(() => ({
                type: chart_type
            }))
        }
    }

    const setTitle = (new_title) => {
        title = new_title
    }

    const setOption = (new_title, new_chart_type, new_data) => {
        setTitle(new_title)
        setChartType(new_chart_type)
        setDataset(new_data)
    }

    const getOption = () => {
        const option = {
            ...DEFAULT_CHART_OPTIONS,
            title: {
                text: title,
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
            series: series
        }

        return option
    }

    return {
        setChartType,
        setDataset,
        setTitle,
        setOption,
        getOption,
    }
}

export default ChartOptionManager