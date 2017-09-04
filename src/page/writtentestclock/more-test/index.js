import React from 'react';
import Footer from '../components/footer'
export default class extends React.Component {

    renderGlobalCss() {
        return (
            <style global jsx>{`
                .written-test-clock {
                    padding: 0!important;
                }
            `}</style>
        )
    }
    render() {
        return (
            <div className='more-test-img'>
                <Footer/>
                <style jsx>{`
                    .more-test-img {
                        background-image: url(/static/writtentestclock/more-test.jpeg);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        height: 100vh;
                        width: 100vw;
                    }
                `}</style>
                {this.renderGlobalCss()}
            </div>
        );
    }
}