import path from 'path';
import { Server } from 'socket.io';
import { FileManagerBackend } from '../../helpers/backend/disk_operations';
import { DATA_STORE_DIRECTORY, WS_EVENT_NAMES } from '../../constants';

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        res.end()
        return;
    }

    const io = new Server(res.socket.server)
    const file_manager_backend = FileManagerBackend();
    
    io.on('connection', (socket) => {
        socket.on(WS_EVENT_NAMES.LIST_FILES, () => {
            const emit_files = (files) => {
                socket.broadcast.emit(WS_EVENT_NAMES.LIST_FILES, files)
            }

            file_manager_backend
                .list_and_watch(DATA_STORE_DIRECTORY, emit_files)
                .on('add', emit_files)
                .on('unlink', emit_files)
        })

        socket.on(WS_EVENT_NAMES.LOAD_DATA, (data) => {
            const packet = JSON.parse(data)

            const emit_content = (content) => {
                socket.broadcast.emit(WS_EVENT_NAMES.LOAD_DATA, content)
            }

            if (!packet?.dataUrl) {
                emit_content({ error: 'ERROR: Filename is needed!' })
                return
            }

            const full_file_path = path.join(DATA_STORE_DIRECTORY, packet.dataUrl);
            file_manager_backend
                .read_and_watch(full_file_path, emit_content)
                .on('change', emit_content)
        })
    })

    res.socket.server.io = io
    res.end();
}

export default SocketHandler;
