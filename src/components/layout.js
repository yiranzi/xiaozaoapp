import React from 'react';
import Header from './partical/header';
import Footer from './partical/footer';

import weui from 'weui';

export default class Layout extends React.Component {
    renderGlobalCss(){
        return (
            <style global jsx>{`
                .main {
                    max-width: 640px;
                    margin: auto;
                }
            `}</style>
        );
    }
    render() {
        return (
            <div>
                <Header/>
                <style dangerouslySetInnerHTML={{__html: weui}}/>
                <div className="main">
                    {this.props.children}
                    <Footer/>
                </div>
                {this.renderGlobalCss()}
            </div>
        );
    }
}