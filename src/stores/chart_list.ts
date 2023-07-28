import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { ChartType } from '../types/chart';

interface ChartListState {
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
        persist(
            (set) => ({
                chart_list: [],
                addChart: (chart: ChartType) => set((state: ChartListState) => {
                    const new_chart: ChartType = {
                        id: state.chart_list.length,
                        data_url: chart.data_url,
                        chart_setting: {
                            chart_type: 'line'
                        }
                    }

                    return {
                        chart_list: [...state.chart_list, new_chart]
                    }
                }),
                setDataURL: (id: number, data_url: string) => set((state: ChartListState) => {
                    const index = getChartIndex(id, state.chart_list)

                    const new_chart_list = state.chart_list
                    new_chart_list[index].data_url = data_url

                    return {
                        chart_list: new_chart_list
                    }
                }),
                getChartType: getChartType,
                setChartType: (id: number, chart_type: string) => set((state: ChartListState) => {
                    const index = getChartIndex(id, state.chart_list)

                    const new_chart_list = state.chart_list
                    new_chart_list[index].chart_setting.chart_type = chart_type
                    return {
                        chart_list: new_chart_list
                    }
                }),
                removeChart: (id: number) => set((state: ChartListState) => {
                    const new_chart_list = state.chart_list.filter((chart) => chart.id != id)

                    return {
                        chart_list: new_chart_list
                    }
                })
            }),
            {
                name: 'chart-list-storage'
            }
        )
    )
)

export default useChartList
