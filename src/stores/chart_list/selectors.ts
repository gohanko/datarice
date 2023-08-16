import { ChartListState } from "./chart_list";

export const chartList = (state: ChartListState) => {
    return state.chartList
}

export const addChart = (state: ChartListState) => {
    return state.addChart
}

export const setDataURL = (state: ChartListState) => {
    return state.setDataURL;
};

export const setCurrentX = (state: ChartListState) => {
    return state.setCurrentX;
}

export const setChartType = (state: ChartListState) => {
    return state.setChartType;
};

export const removeChart = (state: ChartListState) => {
    return state.removeChart;
}
