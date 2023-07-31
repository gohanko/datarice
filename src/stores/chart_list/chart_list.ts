import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { immer } from "zustand/middleware/immer";
import { produce } from 'immer';
import { ChartType } from '../../types/chart';

export interface ChartListState {
    chart_list: Array<ChartType>
    // eslint-disable-next-line no-unused-vars
    addChart: (chart: ChartType) => void
    // eslint-disable-next-line no-unused-vars
    setDataURL: (id: number, data_url: string) => void
    // eslint-disable-next-line no-unused-vars
    getChartType: (id: number, chart_list: Array<ChartType>) => void
    // eslint-disable-next-line no-unused-vars
    setChartType: (id: number, chart_type: string) => void
    // eslint-disable-next-line no-unused-vars
    removeChart: (id: number) => void
}

const getChartIndex = (id: number, chart_list: Array<ChartType>) => {
    return chart_list.findIndex((chart) => chart.id == id)
}

const getChart = (id: number, chart_list: Array<ChartType>) => {
    const index = getChartIndex(id, chart_list)
    return chart_list[index]
}

const getChartType = (id: number, chart_list: Array<ChartType>) => {
    const chart = getChart(id, chart_list)
    return chart.chart_setting.chart_type
}

const useChartList = create<ChartListState>()(
    devtools(
        immer(
            persist(
                (set) => ({
                    chart_list: [],
                    addChart: (chart: ChartType) => set(
                        produce((draft) => {
                            draft.chart_list.push({
                                id: draft.chart_list.length,
                                data_url: chart.data_url,
                                chart_setting: {
                                    chart_type: 'line'
                                }
                            })
                        })
                    ),
                    setDataURL: (id: number, data_url: string) => set(
                        produce((draft) => {
                            const index = getChartIndex(id, draft.chart_list)
                            draft.chart_list[index].data_url = data_url
                        })
                    ),
                    getChartType: getChartType,
                    setChartType: (id: number, chart_type: string) => set(
                        produce((draft) => {
                            const index = getChartIndex(id, draft.chart_list)
                            draft.chart_list[index].chart_setting.chart_type = chart_type
                        })
                    ),
                    removeChart: (id: number) => set(
                        produce((draft) => {
                            draft.chart_list = draft.chart_list.filter((chart) => chart.id != id)
                        })
                    )
                }),
                {
                    name: 'chart-list-storage'
                }
            )
        )
    )
)

export default useChartList
