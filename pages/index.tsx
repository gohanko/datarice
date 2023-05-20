import React, { useState } from 'react';
import { Layout, Typography, theme, Menu } from 'antd';
import ChartCollection from '../components/ChartCollection/chart_collection';
import {
    PieChartOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;


const Home = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { token: { colorBgContainer } } = theme.useToken();

    const navigation_items = [
        {
            key: 1,
            label: 'Dashboard',
            icon: <PieChartOutlined />,
        },
    ]

    return (
        <Layout hasSider>
            <Sider
                breakpoint="lg"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}/>
                <Menu
                    mode="inline"
                    theme='dark'
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    items={navigation_items}
                />
            </Sider>
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ padding: 0, background: colorBgContainer }}></Header>
                <Content style={{ margin: '24px 16px' }}>
                    <ChartCollection />
                </Content>
                <Footer style={{ textAlign: 'center' }}> DataRice - Created by <a href="https://github.com/gohanko" target="_blank">Yii Kuo Chong</a> with ❤️</Footer>
            </Layout>
        </Layout>
    )
};

export default Home;