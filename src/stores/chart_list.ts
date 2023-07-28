import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ChartType } from "../types/chart";

export interface ChartListState {
    chart_list: Array<ChartType>;
    // eslint-disable-next-line no-unused-vars
    addChart: (chart: ChartType) => void;
    // eslint-disable-next-line no-unused-vars
    setDataURL: (id: number, data_url: string) => void;
    // eslint-disable-next-line no-unused-vars
    getChartType: (id: number, chart_list: Array<ChartType>) => void;
    // eslint-disable-next-line no-unused-vars
    setChartType: (id: number, chart_type: string) => void;
    // eslint-disable-next-line no-unused-vars
    removeChart: (id: number) => void;
}

const useChartList = create<ChartListState>()(
    devtools(
        immer(
            persist(
                (set, get) => ({
                    chart_list: [],

                    addChart: (chart: ChartType) => {
                        set((state) => {
                            const new_chart: ChartType = {
                                id: state.chart_list.length,
                                data_url: chart.data_url,
                                chart_setting: {
                                    chart_type: "line",
                                },
                            };

                            state.chart_list.push(new_chart);
                        });
                    },

                    setDataURL: (id: number, data_url: string) => {
                        set((state) => {
                            const chart = state.chart_list.find(
                                (chart) => chart.id == id
                            );

                            if (chart) {
                                chart.data_url = data_url;
                            }
                        });
                    },

                    getChartType: (id: number) => {
                        const chart = get().chart_list.find(
                            (chart) => chart.id == id
                        );

                        return chart
                            ? chart.chart_setting.chart_type
                            : undefined;
                    },

                    setChartType: (id: number, chart_type: string) => {
                        set((state) => {
                            const chart = state.chart_list.find(
                                (chart) => chart.id == id
                            );

                            if (chart) {
                                chart.chart_setting.chart_type = chart_type;
                            }
                        });
                    },

                    removeChart: (id: number) => {
                        set((state) => {
                            const chartIdx = state.chart_list.findIndex(
                                (chart) => chart.id == id
                            );

                            if (chartIdx > -1) {
                                state.chart_list.splice(chartIdx, 1);
                            }
                        });
                    },
                }),
                {
                    name: "chart-list-storage",
                }
            )
        )
    )
);

export default useChartList;
