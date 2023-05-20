import path from 'path';
import fs from 'fs';
import chokidar from 'chokidar';
import { Server } from 'socket.io';
import { list_files } from '../../utils/utils';
import { DATA_STORE_FOLDER } from '../../utils/constants';

const TemperatureDataSocketHandler = (req, res) => {
    if (res.socket.server.io) {
        res.end()
        return;
    }

    const io = new Server(res.socket.server)

    io.on('connection', (socket) => {
        const list_files_and_broadcast = () => {
            const files = list_files(DATA_STORE_FOLDER);
            socket.broadcast.emit('list-existing-data-files', files);
        }

        socket.on('list-existing-data-files', (_) => {
            list_files_and_broadcast();
            
            chokidar
                .watch(DATA_STORE_FOLDER)
                .on('add', (event, path) => {
                    list_files_and_broadcast();
                })
                .on('unlink', (event, path) => {
                    list_files_and_broadcast();
                })
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
            
            chokidar.watch(full_file_path).on('change', (event, path) => {
                let new_content = JSON.parse(fs.readFileSync(full_file_path, 'utf8'))
                
                if (content != new_content) {
                    new_content['filename'] = packet['filename'];
                    content = new_content
                    socket.broadcast.emit('load-data-from-data-file', content);
                }
            })
        })
    })

    res.socket.server.io = io
    res.end();
}

export default TemperatureDataSocketHandler;