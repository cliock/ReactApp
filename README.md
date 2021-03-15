## 封装的React框架
> 基于react-create-app进行二次封装  
> UI框架选用[Ant Design of React](https://ant.design/docs/react/introduce-cn)  
> 封装axios请求  

### hashRouter
> 在url的前面会有一个#   可以理解为锚点 每个路由前面都会有#  这样不至于路由出问题找不到页面

> 优点：不需要后端配置  
> 比如：localhost:3000/#/useinfo

### HistoryRouter
> 路由是怎么样的就会展示什么样的  
> 比如：localhost:3000/useinfo

如果打包将静态文件放在服务器上会出问题   url指向可能就找不到页面啦，他会找根目录以根目录对应。

这个时候就需要配置server（nginx） 或者后端做配置，比如这样：

app.get('*', (req, res) => { ... })   映射一下url    

nginx配置

```
location /web {
   try_files $uri /index.html;
}
```

例子：

app.jsx

```
import React, {Component} from 'react';
//使用hashrouter   如果要改成historyrouter   直接改成  BrowerRouter as Router
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

class App extends Component {


    renderRouters() {
        let routers = [];

        routers.push(<Route exact key={Routers.path} path={Routers.path} component={Routers.component}/>);
        Routers.childRoutes.forEach(function (item) {
            if(item.auth){
                //带登录权限的route
                routers.push(<AuthRoute key={item.path} exact path={item.path} component={item.component}/>);
            }else{
                routers.push(<Route key={item.path} exact  path={item.path} component={item.component}/>);
            }

        });

        return routers;
    }

    render() {
        const children = this.renderRouters();
        return (<Router><Switch>
            {children}
        </Switch></Router>);
    }
}

export default App;
```