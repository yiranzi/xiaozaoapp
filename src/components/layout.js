import React from 'react';
import Header from './partical/header';
import Footer from './partical/footer';

import weui from 'weui';

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <style dangerouslySetInnerHTML={{__html: weui}}/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}