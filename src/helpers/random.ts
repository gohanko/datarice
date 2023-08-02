import path from 'path'
import dayjs from 'dayjs';
import { SUPPORTED_FILE_FORMAT, SYSTEM_DATE_FORMAT } from "../constants"

const isFileFormatSupported = (filename: string) => {
    const extension = path.extname(filename)
    return SUPPORTED_FILE_FORMAT.includes(extension)
}

const formatDate = (value: string, format_template: string) => {
    const date = dayjs(value, SYSTEM_DATE_FORMAT)
    if (date.isValid()) {
        return date.format(format_template)
    }

    return value
}

const createItemAndLabel = (values, capitalise_label=false) => {
    if (values.length == 0) {
        return []
    }
    
    return values.map(value => ({
        value: value,
        label: capitalise_label ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : value
    }))
}


export {
    isFileFormatSupported,
    formatDate,
    createItemAndLabel
}
