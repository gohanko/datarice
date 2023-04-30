import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from '@/styles/Home.module.css';
import ChartCollection from '../components/ChartCollection/chart_collection';

const { Header, Sider, Content, Footer } = Layout;

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer } } = theme.useToken();

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
                        <ChartCollection />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        DataRice - Created by <a href="https://github.com/gohanko" target="_blank">Yii Kuo Chong</a> with ❤️
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    )
};

export default Home;