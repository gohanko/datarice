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
    
    const parseNodeXLSX = (content, worksheet_name='Sheet1') => {
        const selected_worksheet_index = content.worksheets.findIndex((worksheet) => worksheet.name == worksheet_name)
        const selected_worksheet = content.worksheets[selected_worksheet_index]
        const dataset = selected_worksheet.data.map((row) => row.map((item) => item.value))
        return dataset
    }

    const parseData = (data) => {
        let dataset = [];
        
        if (data) {
            switch (data.metadata.ext) {
            case '.json':
                dataset = parseJSONTo2DTable(data.content)
                break
            case '.xlsx':
                dataset = parseNodeXLSX(data.content)
                break
            default:
                break
            }
        }

        return dataset
    }

    return {
        parseData
    }
})()


export default DataParsing;