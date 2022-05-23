import React from 'react'
import {Avatar, Dropdown, Menu, Space} from "antd";
import {LoginOutlined, LogoutOutlined, UserAddOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "@@/exports";
import {history} from "umi";

export default function RightContent() {

    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const menu = (
        <Menu
            onClick={(event: any) => {
                if (event.key === 'logout') {
                    localStorage.removeItem('user');
                    dispatch({type: 'user/logout'});
                } else {
                    history.push('/user/' + event.key);
                }
            }}
            items={
                [
                    ...(user.currentAuthority === 'guest' ? [
                            {
                                key: 'login',
                                icon: <LoginOutlined/>,
                                label: '登录',
                            },
                            {
                                key: 'register',
                                icon: <UserAddOutlined/>,
                                label: '注册',
                            }
                        ]
                        : [
                            {
                                key: 'logout',
                                icon: <LogoutOutlined/>,
                                label: '退出',
                            }
                        ]),

                ]}
        />
    );

    return (
        <Dropdown overlay={menu}>
            <Space>
                <Avatar size="small" alt="avatar"/>
                <span>{user.username == '' ? '访客' : user.username}</span>
            </Space>
        </Dropdown>
    );
}
