import path from 'path';
import fs from 'fs';
import { Server } from 'socket.io';
import { list_files } from '@/utils/utils';
import { DATA_STORE_FOLDER } from '@/utils/constants';

const TemperatureDataSocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
        res.end()
        return;
    }

    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
        socket.on('list-existing-data-files', (_) => {
            const files = list_files(DATA_STORE_FOLDER);
            socket.broadcast.emit('list-existing-data-files', files)
            console.log('Received List Existing Data Files')
        })

        socket.on('load-data-from-data-file', (data) => {
            const packet = JSON.parse(data)
            if (!packet['filename']) {
                socket.broadcast.emit('load-data-from-data-file', 'filename is needed!')
                return
            }

            const full_file_path = path.join(DATA_STORE_FOLDER, packet.filename);
            
            let content = JSON.parse(fs.readFileSync(full_file_path, 'utf8'))
            content['filename'] = packet['filename']
            socket.broadcast.emit('load-data-from-data-file', content)
            
            fs.watch(full_file_path, (event, targetfile) => {
                if (event == 'change') {
                    let new_content = JSON.parse(fs.readFileSync(full_file_path, 'utf8'))
                    
                    if (content != new_content) {
                        new_content['filename'] = packet['filename'];
                        content = new_content
                        socket.broadcast.emit('load-data-from-data-file', content);
                    }
                }
            })
        })
    })

    res.end();
}

export default TemperatureDataSocketHandler;