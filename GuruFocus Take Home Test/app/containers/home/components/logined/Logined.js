import React from 'react'
import style from './style.css'
import {Button} from 'antd'

export const Logined = (props) => (
    <div className={style.container}>
        <img src={require('./timg.jpeg')}/>
        <p>Welcome, {props.userInfo.username}!</p>
        {props.userInfo.userType === 'admin' ?
            <Button onClick={() => props.history.push('/admin')} type="primary">Management Pages</Button> : null}
    </div>
);