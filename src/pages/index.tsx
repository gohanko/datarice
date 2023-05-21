import React, { useState } from 'react';
import Image from 'next/image';
import { Layout, theme, Menu, Row, Col } from 'antd';
import ChartCollection from '../components/ChartList';
import {
    LineChartOutlined,
    PieChartOutlined,
    FolderOpenOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const Home = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { token: { colorBgContainer } } = theme.useToken();

    const navigation_items = [
        {
            key: 1,
            label: 'Dashboard',
            icon: <LineChartOutlined />,
        },
        {
            key: 2,
            label: 'File Manager',
            icon: <FolderOpenOutlined />,
        },
        {
            key: 3,
            label: 'System Resources',
            icon: <PieChartOutlined />,
        },
        {
            key: 4,
            label: 'About',
            icon: <InfoCircleOutlined />,
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
                <Row>
                    <Col span={24}>
                        <h1>
                            <a style={{
                                height: 64,
                                display: 'inline-flex',
                                alignItems: 'center',
                                paddingInlineStart: 15,
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: 'bolder'
                            }}>
                                <Image
                                    src="/rice.png"
                                    width={32}
                                    height={32}
                                    alt='Header Logo'
                                    style={{
                                        marginInlineEnd: 12
                                    }}
                                />
                                <span style={{ fontWeight: 'lighter', color: '#cdd9e5' }}>data</span>
                                <span>rice</span>
                            </a>
                        </h1>
                    </Col>
                </Row>
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