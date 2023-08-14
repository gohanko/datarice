import React, { useState } from 'react';
import Image from 'next/image';
import { Layout, theme, Menu, Row, Col } from 'antd';
import {
    LineChartOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import ChartDashboard from '../components/ChartDashboard';

const { Header, Sider, Content, Footer } = Layout;

const Home = () => {
    const [currentOption, setCurrentOption] = useState('1');
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
            label: 'About',
            icon: <InfoCircleOutlined />,
        },
    ]

    const onClickMenu = (event) => {
        setCurrentOption(event.key);
    }

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
                                width: '100%',
                                display: 'inline-flex',
                                alignItems: 'center',
                                paddingInlineStart: collapsed ? 0 : 15,
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: 'bolder',
                            }}>
                                <Image
                                    src="/rice.png"
                                    width={32}
                                    height={32}
                                    alt='Header Logo'
                                    style={{
                                        margin: collapsed ? 'auto': '0px 12px 0px 0px',
                                    }}
                                />
                                { !collapsed &&
                                <React.Fragment>
                                    <span style={{ fontWeight: 'lighter', color: '#cdd9e5' }}>data</span>
                                    <span>rice</span>
                                </React.Fragment>
                                }
                            </a>
                        </h1>
                    </Col>
                </Row>
                <Menu
                    mode="inline"
                    theme='dark'
                    onClick={onClickMenu}
                    defaultSelectedKeys={[currentOption]}
                    items={navigation_items}
                />
            </Sider>
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ padding: 0, background: colorBgContainer }}></Header>
                <Content style={{ margin: '24px 16px' }}>
                    { currentOption == '1' &&
                        <ChartDashboard />
                    }
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Made with ❤️ by <a href="https://github.com/gohanko" target="_blank">Yii Kuo Chong / 俞國忠</a>
                </Footer>
            </Layout>
        </Layout>
    )
};

export default Home;
