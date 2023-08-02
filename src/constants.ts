import { formatDate } from "./helpers/random";

const DATA_STORE_DIRECTORY = process.env.DATA_STORE_DIRECTORY;

const DEFAULT_CHART_TYPE_SIZES = {
    'line': 12
}

const DEFAULT_CHART_OPTIONS = {
    dataset: {
        source: []
    },
    title: {
        text: '',
    },
    tooltip : {
        trigger: 'axis'
    },
    toolbox: {
        show: true,
        feature: {
            magicType: {
                show: true,
                type: [
                    'stack',
                ]
            },
            restore: {},
            saveAsImage: {}
        }
    },
    grid: {
        bottom: 24,
        left: 26,
        right: 26,
    },
    series: [],
    xAxis: {
        type: 'category',
        axisLabel: {
            formatter: (value) => formatDate(value, 'MMM DD')
        }
    },
    yAxis: {
        min: 24
    },
}

const SYSTEM_DATE_FORMAT = 'YYYY-MM-DD'

const SUPPORTED_CHART_TYPES = [
    'line',
    'bar',
    'pie',
    'scatter',
    'effectScatter',
    //'parallel',
    //'candlestick',
    //'map',
    'funnel',
    //'custom'
]

const SUPPORTED_FILE_FORMAT = [
    '.csv',
    '.ods',
    '.xls',
    '.xlsx',
    '.json'
]

export {
    DATA_STORE_DIRECTORY,
    DEFAULT_CHART_TYPE_SIZES,
    DEFAULT_CHART_OPTIONS,
    SUPPORTED_CHART_TYPES,
    SUPPORTED_FILE_FORMAT,
    SYSTEM_DATE_FORMAT,
};
