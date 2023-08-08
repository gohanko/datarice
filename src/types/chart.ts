interface ChartSettingType {
    chartType: string
}

interface ChartType {
    id?: number
    chartSetting?: ChartSettingType
    dataUrl: string
}

export type {
    ChartSettingType,
    ChartType,
}
