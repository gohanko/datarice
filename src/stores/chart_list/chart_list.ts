import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { immer } from "zustand/middleware/immer";
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid'
import { ChartType } from '../../types/chart';

export interface ChartListState {
    chartList: Array<ChartType>
    addChart: (chart: ChartType) => void
    setDataURL: (id: number, dataUrl: string) => void
    setCurrentX: (id: number, currentX: string) => void
    setChartType: (id: number, chartType: string) => void
    removeChart: (id: number) => void
}

const useChartList = create<ChartListState>()(
    devtools(
        immer(
            persist(
                (set) => ({
                    chartList: [],
                    addChart: (chart: ChartType) => set(
                        produce((draft) => {
                            draft.chartList.push({
                                id: uuidv4(),
                                dataUrl: chart.dataUrl,
                                chartSetting: {
                                    chartType: 'line'
                                }
                            })
                        })
                    ),
                    setDataURL: (id: number, dataUrl: string) => set(
                        produce((draft) => {
                            const chart = draft.chartList.find((chart) => chart.id == id)
                            if (chart) {
                                chart.dataUrl = dataUrl
                            }
                        })
                    ),
                    setCurrentX: (id: number, currentX: string) => set(
                        produce((draft) => {
                            const chart = draft.chartList.find((chart) => chart.id == id)
                            if (chart) {
                                chart.chartSetting.currentX = currentX
                            }
                        })
                    ),
                    setChartType: (id: number, chartType: string) => set(
                        produce((draft) => {
                            const chart = draft.chartList.find((chart) => chart.id == id)
                            if (chart) {
                                chart.chartSetting.chartType = chartType
                            }
                        })
                    ),
                    removeChart: (id: number) => set(
                        produce((draft) => {
                            draft.chartList = draft.chartList.filter((chart) => chart.id != id)
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
