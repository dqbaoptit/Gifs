import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
export default () => {
    return (
        <Menu mode="horizontal" style={{ margin: 20 }}>
            <Menu.Item>
                <Link to="/Gifs" >Gifs</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/sticker">Sticker</Link>
            </Menu.Item>
        </Menu>
    );

}