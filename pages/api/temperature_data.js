import path from 'path';
import fs from 'fs';
import { Server } from 'socket.io';

const TemperatureDataSocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', (socket) => {
            socket.on('load-data', (msg) => {
                console.log('Received load-data request.')
                
                const filename = path.join(process.cwd(), 'mock_data') + '/monthly_temp.json';
                let content = fs.readFileSync(filename, 'utf8')
                socket.broadcast.emit('load-data', JSON.parse(content))
                
                fs.watch(filename, (event, targetfile) => {
                    if (event == 'change') {
                        const new_content = fs.readFileSync(filename, 'utf8')

                        if (content != new_content) {
                            content = JSON.parse(new_content);
                            socket.broadcast.emit('load-data', content);
                        }
                    }
                })
            })
        })
    }

    res.end()
}

export default TemperatureDataSocketHandler;