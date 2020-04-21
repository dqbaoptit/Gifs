import React from 'react';
import { Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const antIcon = <SyncOutlined style={{ fontSize: 120,color: "red" }} spin />

export default () => {
    return (
        <div align="center">
            <Spin indicator={antIcon} />
        </div>
    )
}