import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import dayjs from 'dayjs';
import { Layout, Card, theme, Spin, Radio } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import styles from '@/styles/Home.module.css';

const { Header, Sider, Content, Footer } = Layout;

const Chart = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [size, setSize] = useState('last_month'); // default is 'middle'

    useEffect(() => {   
        socketInitializer();
    }, [])
    
    const socketInitializer = async () => {
        await fetch('/api/temperature_data');
        const socket = io();
  
        socket.on('connect', () => {
            console.log('Websocket API connected.');
            socket.emit('load-data');
            console.log('Sent load-data request.');
        })

        socket.on('load-data', (data) => {
            setLoading(false);
            const usable_data = data['daily']['time'].map((time, index) => ({
                time: dayjs(time).format('MMM D'),
                temperature: data['daily']['temperature_2m_mean'][index] 
            }));
            
            setData(usable_data);
            console.log('Loaded data: ' + data);
        })
    }

    if (isLoading) return <Spin tip="Loading..." size="large" />
    if (!data) return <Spin tip="Loading..." size="large" />

    return (
        <Card title={'Latest Kampar Daily Average Temperature'}>
            <div
                style={{
                    width: '100%',
                    display: 'flow-root',
                    marginBottom: '10px',
                }}
            >
                <Radio.Group
                    value={size}
                    onChange={(e) => {
                        let start_date = '';
                        let end_date = '';

                        const val = e.target.value;
                        start_date = dayjs().subtract(7, 'day');
                        if (val == 'last_2_week') {
                            end_date = dayjs(start_date).subtract(14, 'day')
                        } else if (val == 'last_month') {
                            end_date = dayjs(start_date).subtract(dayjs(start_date).daysInMonth(), 'day')
                        } else if (val == 'last_year') {
                            end_date = dayjs(start_date).subtract(12, 'month')
                        }


                        setSize(e.target.value)
                    }}
                    style={{
                        float: 'right'
                    }}
                >
                    <Radio.Button value="last_2_week">Last 2 week</Radio.Button>
                    <Radio.Button value="last_month">Last month</Radio.Button>
                    <Radio.Button value="last_year">Last year</Radio.Button>
                </Radio.Group>
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
}

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, colorTextLightSolid },
      } = theme.useToken();

    return (
        <Layout style={{ height: '100%' }}>
            <Sider
                breakpoint="lg"
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className={styles.logo} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: styles.trigger,
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Layout style={{ overflow: 'scroll' }}>
                    <Content style={{ margin: '24px 16px' }}>
                        <Chart />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        DVisual - Created by <a href="https://github.com/gohanko" target="_blank">Yii Kuo Chong</a> with ❤️
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    )
};

export default Home;