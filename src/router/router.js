import React from 'react';
//使用hashrouter   如果要改成historyrouter   直接改成  BrowerRouter as Router
import { HashRouter as Router, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from './loading'

/**
 * 导入组件
 * @param {路由} component 
 * @returns 
 */
function getComponent(component) {
    return Loadable({
        loader: component,
        loading: LoadingComponent
    })
}


const RouterArr = [
    {
        path: '/pageA',
        name: 'pageA',
        component: getComponent(() => import('../view/pageA/index'))
    },
    {
        path: '/pageB',
        name: 'pageB',
        component: getComponent(() => import('../view/pageB/index'))
    }
]

class Root extends React.Component {
    render() {
        return (
            <Router>
                <Route path='/' key='home' exact component={RouterArr[0].component} />
                {
                    RouterArr.map(item => <Route path={item.path} key={item.name} component={item.component} />)
                }
            </Router>
        );
    }
}

export default Root