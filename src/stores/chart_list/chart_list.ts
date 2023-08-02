import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { immer } from "zustand/middleware/immer";
import { produce } from 'immer';
import { ChartType } from '../../types/chart';

export interface ChartListState {
    chart_list: Array<ChartType>
    addChart: (chart: ChartType) => void
    setDataURL: (id: number, data_url: string) => void
    setChartType: (id: number, chart_type: string) => void
    removeChart: (id: number) => void
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
                            const chart = draft.chart_list.find((chart) => chart.id == id)
                            if (chart) {
                                chart.data_url = data_url
                            }
                        })
                    ),
                    setChartType: (id: number, chart_type: string) => set(
                        produce((draft) => {
                            const chart = draft.chart_list.find((chart) => chart.id == id)
                            if (chart) {
                                chart.chart_setting.chart_type = chart_type
                            }
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
