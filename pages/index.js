import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme } from 'antd';
import { RadarChartOutlined } from '@ant-design/icons';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import "antd/dist/reset.css";
import styles from '@/styles/Home.module.css';

const { Header, Sider, Content, Footer } = Layout;

const Chart = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('https://archive-api.open-meteo.com/v1/archive?latitude=4.30&longitude=101.15&start_date=2023-02-03&end_date=2023-03-03&daily=temperature_2m_mean&timezone=Asia%2FSingapore')
            .then((res) => res.json())
            .then((data) => {
                const usable_data = data['daily']['time'].map((time, index) => ({ time: time, temperature: data['daily']['temperature_2m_mean'][index] }));
	
                setData(usable_data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    console.log(data);
    return (
        <LineChart
            width={1200}
            height={579}
            data={data}
        >
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" />
            <YAxis />
        </LineChart>
    )
}

const Home = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    return(
        <Layout>
            <Header className={styles.header}>
                <div className=''>
                    <h1>
                        <RadarChartOutlined style={{ fontSize: '24px' }} />
                        <span>DVisual</span>
                    </h1>
                </div>

                <Menu theme="dark" mode="horizontal" />
            </Header>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    width={250}
                    style={{ background: colorBgContainer }}
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                </Sider>
                <Layout>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <Chart />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>©2023 Created by Yii Kuo Chong with ❤️</Footer>
                </Layout>
            </Layout>
        </Layout>
    )
};

export default Home;