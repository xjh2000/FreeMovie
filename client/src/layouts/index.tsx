import React, {useEffect, useState} from 'react';
import {Link, Outlet} from 'umi';
import styles from './index.less';
import {useLocation} from "@@/exports";

export default function Layout() {

    // 导航栏的显示配置
    const location = useLocation();
    const [show, setShow] = useState(true);
    useEffect(() => {
        if (location.pathname.startsWith('/user')) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [location]);

    return (
        <div className={styles.navs}>
            {show && (
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/docs">Docs</Link>
                    </li>
                </ul>
            )}
            <Outlet/>
        </div>
    );
}
