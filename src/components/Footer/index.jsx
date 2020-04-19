import React from 'react';
import { Layout } from 'antd';
import './index.css';
const { Footer } = Layout;
export default () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            <p>
                Data from  Giphy.com
            </p>
        </Footer>
    )
}