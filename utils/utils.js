import fs from 'fs';

const list_files = (directory) => {
    const data = fs.readdirSync(directory)
    return data ? data : []
}

export { list_files };