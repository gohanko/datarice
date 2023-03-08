import React, { useState, useEffect } from 'react';
import {
    Layout,
    Menu,
    theme,
    DatePicker,
    Form,
    Spin,
    Input,
    Button,
} from 'antd';
import { RadarChartOutlined } from '@ant-design/icons';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import "antd/dist/reset.css";
import styles from '@/styles/Home.module.css';

const { Header, Sider, Content, Footer } = Layout;
const { RangePicker } = DatePicker;

const WeatherDataMenu = () => {
    const handleOnFinish = (values) => {
        
    }

    return (
        <Form
            layout="vertical"
            onFinish={handleOnFinish}    
        >
            <Form.Item label="Latitude" >
                <Input />
            </Form.Item>
            <Form.Item label="Longitude">
                <Input />
            </Form.Item>
            <Form.Item label="Date Range">
                <RangePicker />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" ghost={true} block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

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

    if (isLoading) return <Spin tip="Loading..." size="large" />
    if (!data) return <p>No profile data</p>
    console.log(data);
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
            </LineChart>
        </ResponsiveContainer>
    )
}

const Home = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    return(
        <Layout>
            <Header className={styles.header}>
                <h1>
                    <RadarChartOutlined style={{ fontSize: '24px' }} />
                    <span>DVisual</span>
                </h1>

                <Menu theme="dark" mode="horizontal" />
            </Header>
            <Layout>
                <Layout style={{ height: "91.3vh" }}>
                    <Content style={{ margin: '24px 32px 0 0' }}>
                        <Chart />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>©2023 Created by Yii Kuo Chong with ❤️</Footer>
                </Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    width={240}
                    style={{ background: colorBgContainer, padding: '10px' }}
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <WeatherDataMenu />
                </Sider>
            </Layout>
        </Layout>
    )
};

export default Home;