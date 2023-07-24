const DATA_STORE_DIRECTORY = process.env.DATA_STORE_DIRECTORY;

const DEFAULT_CHART_TYPE_SIZES = {
    'line': 12
}

const DEFAULT_CHART_OPTIONS = {
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
}

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

export {
    DATA_STORE_DIRECTORY,
    DEFAULT_CHART_TYPE_SIZES,
    DEFAULT_CHART_OPTIONS,
    SUPPORTED_CHART_TYPES
};