import React from 'react';
import { Layout, Card } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const Chart = ({ filename, data }) => (
    <Card title={filename}>
        <div
            style={{
                width: '100%',
                display: 'flow-root',
                marginBottom: '10px',
            }}
        >

        </div>
        <Layout style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} style={{ backgroundColor: 'white' }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </Layout>
    </Card>
);

export default Chart;