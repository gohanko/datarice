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
        const selected_worksheet_index = data.worksheets.findIndex((worksheet) => worksheet.name == worksheet_name)
        const selected_worksheet = data.worksheets[selected_worksheet_index]
        const dataset = selected_worksheet.data.map((row) => row.map((item) => item.value))
        return dataset
    }

    const parseFileData = (fileData) => {
        let dataset = [];
        
        if (fileData) {
            switch (fileData.metadata.ext) {
            case '.json':
                dataset = parseJSONTo2DTable(fileData.content)
                break
            case '.xlsx':
                dataset = parseNodeXLSX(fileData.content)
                break
            default:
                break
            }
        }

        fileData.content = dataset

        return fileData
    }

    return {
        parseFileData
    }
})()


export default DataParsing;
