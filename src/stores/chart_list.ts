import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface ChartState {
    id?: number
    data_url: string
    column_size: number
}

interface ChartListState {
    chart_list: Array<ChartState>
    // eslint-disable-next-line no-unused-vars
    addChart: (chart: ChartState) => void
    // eslint-disable-next-line no-unused-vars
    setDataURL: (id: number, data_url: number) => void
    // eslint-disable-next-line no-unused-vars
    removeChart: (id: number) => void
}

const useChartList = create<ChartListState>()(
    devtools(
        persist(
            (set) => ({
                chart_list: [],
                addChart: (chart: ChartState) => set((state: ChartListState) => {
                    const new_chart: ChartState = {
                        id: state.chart_list.length,
                        data_url: chart.data_url,
                        column_size: chart.column_size,
                    }

                    return {
                        chart_list: [...state.chart_list, new_chart]
                    }
                }),
                setDataURL: (id: number, data_url: string) => set((state: ChartListState) => {
                    const index = state.chart_list.findIndex((chart) => chart.id == id)

                    const new_chart_list = state.chart_list
                    new_chart_list[index].data_url = data_url

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