import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import style from './style.css'
import {Tabs} from 'antd';
import LoginForm from './LoginForm'
import RegisterForm from "./RegisterForm";
const TabPane = Tabs.TabPane;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }


    render() {
        const {login,register} = this.props;
        return (
            <Tabs defaultActiveKey="1" tabBarStyle={{textAlign: 'center'}} className={style.container}>
                <TabPane tab="Sign In" key="1">
                    <LoginForm login={login}/>
                </TabPane>
                <TabPane tab="Sign Up" key="2">
                    <RegisterForm register={register}/>
                </TabPane>
            </Tabs>
        )
    }
}


