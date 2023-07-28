import path from 'path'
import dayjs from 'dayjs';
import { SUPPORTED_FILE_FORMAT } from "../common/constants"

const isFileFormatSupported = (filename: string) => {
    const extension = path.extname(filename)
    return SUPPORTED_FILE_FORMAT.includes(extension)
}

const formatDate = (value: string, format_template: string) => {
    const date = dayjs(value)
    if (date.isValid()) {
        return date.format(format_template)
    }

    return value
}

export {
    isFileFormatSupported,
    formatDate
}
