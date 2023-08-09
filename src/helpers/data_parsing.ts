import { SUPPORTED_FILE_FORMAT } from "../constants"
import { deepCopy } from "./random"

const DataParsing = (() => {
    // Converts JSON object into a 2D table
    const parseJSONTo2DTable = (data) => {
        const dataset = []
        dataset.push(Object.keys(data))
    
        const rows = []
        Object.keys(data).forEach((key) => {
            data[key].forEach((value, index) => {
                if (!rows[index]) {
                    rows[index] = []
                }
    
                rows[index].push(value)
            })
        })
    
        dataset.push(...rows)
        return dataset
    }
    
    const parseNodeXLSX = (data, worksheet_name='Sheet1') => {
        const selected_worksheet_index = data.findIndex((worksheet) => worksheet.name == worksheet_name)
        const selected_worksheet = data[selected_worksheet_index]
        const dataset = selected_worksheet.data.map((row) => row.map((item) => item))
        return dataset
    }

    const parseFileData = (fileData) => {
        const newFileData = deepCopy(fileData) // Deepcopy here because parseFileData will alter the original dataset causing bugs.
        let dataset = [];
        
        if (newFileData) {
            switch (newFileData.metadata.ext) {
            case SUPPORTED_FILE_FORMAT[0]:
            case SUPPORTED_FILE_FORMAT[1]:
            case SUPPORTED_FILE_FORMAT[2]:
            case SUPPORTED_FILE_FORMAT[3]: {
                dataset = parseNodeXLSX(newFileData.content)
                break
            }
            case SUPPORTED_FILE_FORMAT[4]: {
                dataset = parseJSONTo2DTable(newFileData.content)
                break
            }
            default: {
                break
            }
            }
        }

        newFileData.content = dataset
        return newFileData
    }

    return {
        parseFileData
    }
})()


export default DataParsing;
