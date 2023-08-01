import { ChartListState } from "./chart_list";

export const chart_list = (state: ChartListState) => {
    return state.chart_list
}

export const addChart = (state: ChartListState) => {
    return state.addChart
}

export const setDataURL = (state: ChartListState) => {
    return state.setDataURL;
};

export const getChartType = (state: ChartListState) => {
    return state.getChartType;
};

export const setChartType = (state: ChartListState) => {
    return state.setChartType;
};

export const removeChart = (state: ChartListState) => {
    return state.removeChart;
}
