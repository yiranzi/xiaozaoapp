import React from 'react';
import Header from './partical/header';
//import styles
// import 'weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
}