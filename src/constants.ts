import { formatDate } from "./helpers/random";

const DATA_STORE_DIRECTORY = process.env.DATA_STORE_DIRECTORY;

const DEFAULT_CHART_TYPE_SIZES = {
    'line': 12
}

const DEFAULT_CHART_OPTIONS = {
    dataset: {
        source: []
    },
    dataZoom: [
        {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
        },
        {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
        },
        {
            type: 'inside',
            xAxisIndex: [0],
        },
        {
            type: 'inside',
            yAxisIndex: [0],
        }
    ],
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
