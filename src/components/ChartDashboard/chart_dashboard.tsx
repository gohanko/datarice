import React, { useEffect } from 'react';
import { Col, Row, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { io } from "socket.io-client";
import Chart from '../Chart';
import useChartList from '../../stores/chart_list/chart_list';
import useFileList from '../../stores/file_list/file_list';
import DataParsing from '../../helpers/data_parsing';
import * as chart_list_selectors from '../../stores/chart_list/selectors';
import * as file_list_selectors from '../../stores/file_list/selectors';
import { WS_EVENT_NAMES } from '../../constants';

const ChartDashboard = () => {
    const chartList = useChartList(chart_list_selectors.chartList)
    const addChart = useChartList(chart_list_selectors.addChart)

    const setFileList = useFileList(file_list_selectors.setFileList)
    const setFileData = useFileList(file_list_selectors.setFileData)

    const handleOnClickFloat = () => addChart({ dataUrl: '' })

    useEffect(() => {
        const socket = io()
        const socketInitializer = async () => {
            await fetch('/api/socket')

            socket.on('connect', () => {
                socket.emit(WS_EVENT_NAMES.LIST_FILES)
            })
            
            socket.on(WS_EVENT_NAMES.LIST_FILES, (fileList) => {
                setFileList(fileList)
            })

            socket.on(WS_EVENT_NAMES.LOAD_DATA, (fileData) => {
                const newFileData = DataParsing.parseFileData(fileData)
                setFileData(newFileData)
            })
        }

        socketInitializer()

        return () => {
            if (socket) {
                socket.removeAllListeners();
                socket.close();
            }
        }
    }, [])

    return (
        <React.Fragment>
            <Row gutter={[16, 16]}>
                { chartList.map((chart, index) => (
                    <Col span={12} key={index}>
                        <Chart {...chart} />
                    </Col>
                ))}
            </Row>

            <FloatButton
                icon={<PlusOutlined />}
                onClick={handleOnClickFloat}
            />
        </React.Fragment>
    );
}

export default ChartDashboard;
