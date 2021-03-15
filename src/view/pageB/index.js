import React from 'react';

class PageB extends React.Component {
    constructor(props){
        super(props)
        console.log(props.location)
    }

    jumpPage() {
        this.props.history.push({ pathname: '/pageA', query: { data: 'aa' } })
    }

    render() {
        return (
            <div onClick={this.jumpPage.bind(this)}>
                页面B
            </div>
        );
    }
}

export default PageB