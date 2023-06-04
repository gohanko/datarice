import React from 'react';
import { Button, Modal } from 'antd';

type ChartSettingsProps = {
    chart_options: object,
    setChartOptions: Function,
    isChartSettingsOpen: boolean,
    setIsChartSettingsOpen: Function
}

const ChartSettings = ({ chart_options, setChartOptions, isChartSettingsOpen, setIsChartSettingsOpen }: ChartSettingsProps) => {
    const updateChartOptions = () => {
        
    }

    return (
        <Modal
            title={'Chart Settings - Filname.TxT'}
            open={isChartSettingsOpen}
            footer={[
                <Button key="submit" type="primary" onClick={() => setIsChartSettingsOpen(false)}>
                    Submit
                </Button>,
            ]}
            onCancel={() => setIsChartSettingsOpen(false)}
        >

        </Modal>
    )
}

export default ChartSettings