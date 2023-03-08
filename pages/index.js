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
import dayjs from 'dayjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

import styles from '@/styles/Home.module.css';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;

const date_format = 'YYYY-MM-DD';

const ChartSidebar = (props) => {
    const handleOnFinish = (values) => {
        props.submitCallback(values.latitude, values.longitude, values.data_range[0].format(date_format), values.data_range[1].format(date_format));
    }

    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    }

    return (
        <Sider
            theme='light'
            breakpoint="lg"
            width={240}
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <h1 className={styles.sidebar_menu_header}>
                <RadarChartOutlined style={{ fontSize: '24px' }} />
                <span className={styles.sidebar_menu_header_title}>DVisual</span>
            </h1>

            <Form
                style={{ padding: "10px" }}
                layout="vertical"
                onFinish={handleOnFinish}    
            >
                <Form.Item label="Latitude" name="latitude" rules={[{ required: true, message: 'Please input the latitude!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Longitude" name="longitude" rules={[{ required: true, message: 'Please input the longitude!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Date Range" name="data_range" rules={[{ required: true, message: 'Please input the date range!' }]}>
                    <RangePicker disabledDate={disabledDate} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" ghost={true} block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Sider>
    );
}

const ChartDisplay = (props) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={props.data}>
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

const Chart = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchData('4.30', '101.15', '2023-02-03', '2023-03-03');
    }, [])

    const fetchData = (latitude, longitude, start_date, end_date) => {
        fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}&daily=temperature_2m_mean&timezone=Asia%2FSingapore`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const usable_data = data['daily']['time'].map((time, index) => ({ time: time, temperature: data['daily']['temperature_2m_mean'][index] }));
	
                setData(usable_data)
                setLoading(false)
            })
    }

    if (isLoading) return <Spin tip="Loading..." size="large" />
    if (!data) return <p>No profile data</p>

    return (
        <>
            <ChartSidebar submitCallback={fetchData} />
            <Layout style={{ height: "100vh" }}>
                <Content style={{ margin: '24px 32px 0 0' }}>
                    <ChartDisplay data={data}/>
                </Content>
            </Layout>
        </>
    );
}

const Home = () => {
    return (
        <Layout>
            <Chart />
        </Layout>
    )
};

export default Home;