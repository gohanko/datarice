
import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import Chart from './chart';

const ChartCollection = () => {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        fetch('/api/temperature_data').finally(() => {
            const socket = io();

            socket.on('connect', () => {
                console.log('Websocket API connected.');
                socket.emit('list-existing-data-files')
            })
    
            socket.on('list-existing-data-files', (data) => {
                setFileList(data);
            })

            return () => {
                socket.off();
            }
        })
    }, [])
    
    let charts = fileList.map((filename, index) => {
        return (<Chart key={index} filename={filename} />)
    })

    return (<React.Fragment>{ charts }</React.Fragment>);
}

export default ChartCollection;