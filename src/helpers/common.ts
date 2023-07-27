import path from 'path'
import { SUPPORTED_FILE_FORMAT } from "../common/constants"

SUPPORTED_FILE_FORMAT

const isFileFormatSupported = (filename) => {
    const extension = path.extname(filename)
    return SUPPORTED_FILE_FORMAT.includes(extension)
}

export {
    isFileFormatSupported
}