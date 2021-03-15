import React from 'react';
import { message } from 'antd'

class PageA extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.location)
    }

    jumpPage() {
        window.api.menu.getMenu({ username: 'admin', password: '123456' }).then(res => {
            console.log(res)
            message.success('This is a success message')
        }).catch(() => {

        })

        this.props.history.push({ pathname: '/pageB', state: { data: '123' } })
    }

    render() {
        return (
            <div onClick={this.jumpPage.bind(this)}>
                页面A
            </div>
        );
    }
}

export default PageA