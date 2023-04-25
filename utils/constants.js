import path from 'path';

const DATA_STORE_FOLDER_DEV = path.join(process.cwd(), 'mock_data')
const DATA_STORE_FOLDER = DATA_STORE_FOLDER_DEV; // Future: Check if is production or dev.

export { DATA_STORE_FOLDER };