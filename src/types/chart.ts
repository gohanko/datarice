interface ChartSettingType {
    chartType: string
    currentX: string
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
