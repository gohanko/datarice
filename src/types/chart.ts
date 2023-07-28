interface ChartSettingType {
    chart_type: string
}

interface ChartType {
    id?: number
    chart_setting?: ChartSettingType
    data_url: string
}

export type {
    ChartSettingType,
    ChartType,
}
