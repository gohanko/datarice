import fs from 'fs';
import xlsx from 'xlsx'
import dayjs from 'dayjs'

xlsx.set_fs(fs);

const FILENAME = './fixtures/continuous_write.xlsx'
const startFromDate = dayjs()

const initiateWorkbook = () => {
    const workbook = xlsx.utils.book_new()
    const worksheet = xlsx.utils.aoa_to_sheet([
        ['date', 'min', 'median', 'max']
    ], { cellDates: true })

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    xlsx.writeFile(workbook, FILENAME)
}

const appendWorkbook = (aoa_row) => {
    const workbook = xlsx.readFile(FILENAME, { cellDates: true })
    const selected_worksheet = workbook.Sheets[workbook.SheetNames[0]]
    
    xlsx.utils.sheet_add_aoa(selected_worksheet, [aoa_row], { origin: -1 })
    xlsx.writeFile(workbook, FILENAME, { bookType: 'xlsx' })
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const continuous_write = async () => {
    if (!fs.existsSync(FILENAME)) {
        initiateWorkbook()
    }

    const isRunning = true
    let idx = 0
    while (isRunning) {
        const data = [
            startFromDate.add(idx, 'day').format('DD/MM/YYYY'),
            getRandomNumber(24, 28),
            getRandomNumber(28, 33),
            getRandomNumber(33, 39)
        ]

        appendWorkbook(data)
        
        idx++
        console.log(data)
        await delay(2000)
    }
}

continuous_write()
