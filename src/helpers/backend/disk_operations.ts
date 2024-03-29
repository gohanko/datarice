import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import chokidar from 'chokidar';
import { SUPPORTED_FILE_FORMAT } from '../../constants';
import { isFileFormatSupported } from '../random';

const readDataFile = (filename) => {
    if (!isFileFormatSupported(filename)) {
        throw 'NOT_SUPPORTED';
    }
    
    const extension = path.extname(filename)

    let parsed_data = undefined
    switch(extension) {
    case SUPPORTED_FILE_FORMAT[0]:
    case SUPPORTED_FILE_FORMAT[1]:
    case SUPPORTED_FILE_FORMAT[2]:
    case SUPPORTED_FILE_FORMAT[3]: {
        const raw_data = fs.readFileSync(filename)
        const workbook = xlsx.read(raw_data, { raw: true, cellDates: true })

        parsed_data = Object.keys(workbook.Sheets).map((name) => {
            const sheet = workbook.Sheets[name]
            return {
                name,
                data: xlsx.utils.sheet_to_json(sheet, { header: 1 })
            }
        })

        break
    }
    case SUPPORTED_FILE_FORMAT[4]: {
        const raw_data = fs.readFileSync(filename, 'utf-8')
        parsed_data = JSON.parse(raw_data)
        break
    }
    default:
        break
    }

    return {
        metadata: {
            filename: filename.replace(/^.*[\\/]/, '') ,
            ext: extension,
        },
        content: parsed_data
    };
}

const FileManagerBackend = (() => {
    const list = (file_path) => {
        const data = fs.readdirSync(file_path);
        return data.map((filename) => filename)
    }

    const list_and_watch = (path, callback) => {
        const files = list(path)
        const watcher = chokidar.watch(path);

        callback(files)

        const on = (event_type, callback) => {
            watcher.on(event_type, () => {
                const new_files = list(path)
                callback(new_files)
            })

            return { on }
        }

        return { on }
    }

    const read_and_watch = (path, callback) => {
        const watcher = chokidar.watch(path);
        let content = readDataFile(path);

        callback(content);

        const on = (event_type, callback) => {
            watcher.on(event_type, () => {
                const new_content = readDataFile(path)
            
                if (content != new_content) {
                    content = new_content
                    callback(new_content)
                }
            })
                
            return { on }
        }

        return { on }
    }

    return {
        list,
        list_and_watch,
        read_and_watch,
    }
})()

export {
    readDataFile,
    FileManagerBackend,
};
