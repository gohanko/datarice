import { FileData } from "../../types/file"

const getFileData = (filename: string, file_data_list: Array<FileData>) => {
    const data = file_data_list.find((file_data) => file_data.metadata.filename == filename) || { content: []}
    return data
}

export {
    getFileData
}
