import fs from 'fs';
import path from 'path';
import xlsx from 'node-xlsx';
import chokidar from 'chokidar';

const read_data_file = (filename) => {
    const SUPPORTED_FILE_FORMAT = [
        '.csv',
        '.ods',
        '.xls',
        '.xlsx',
        '.json'
    ]

    const extension = path.extname(filename)
    if (!SUPPORTED_FILE_FORMAT.includes(extension)) {
        throw 'NOT_SUPPORTED';
    }

    const raw_data = fs.readFileSync(filename, 'utf-8')

    var parsed_data = []
    switch(extension) {
        case SUPPORTED_FILE_FORMAT[0]:
        case SUPPORTED_FILE_FORMAT[1]:
        case SUPPORTED_FILE_FORMAT[2]:
        case SUPPORTED_FILE_FORMAT[3]:
            parsed_data = xlsx.parse(raw_data);
            break
        case SUPPORTED_FILE_FORMAT[4]:
            parsed_data = JSON.parse(raw_data.toString())
            break
        default:
            break
    }

    return {
        filename: '',
        data: parsed_data
    };
}

const FileManagerBackend = () => {
    const list = (path) => {
        const data = fs.readdirSync(path);
        return data ? data : []
    }

    const list_and_watch = (path, callback) => {
        const files = list(path)
        const watcher = chokidar.watch(path);

        callback(files)

        const on = (event_type, callback) => {
            watcher.on(event_type, () => { callback(files) });
            return { on }
        }

        return { on }
    }

    const read_and_watch = (path, callback) => {
        const watcher = chokidar.watch(path);
        var content = read_data_file(path);

        callback(content);

        const on = (event_type, callback) => {
            var new_content = read_data_file(path)

            if (content != new_content) {
                content = new_content
                watcher.on(event_type, () => { callback(content)})
            }

            return { on }
        }

        return { on }
    }

    return {
        list,
        list_and_watch,
        read_and_watch,
    }
}

export {
    FileManagerBackend,
    read_data_file,
};