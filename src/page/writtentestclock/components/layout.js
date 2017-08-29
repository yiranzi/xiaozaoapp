import React from 'react';
import Layout from '../../../components/layout';
import ThemeConfig from '../../../../config/theme';

export default class WrittenTestClock extends React.Component {
    renderGlobalCss(){
        return (
            <style global jsx>{`
                .written-test-clock {
                    background: url('/static/bg.jpg');
                    min-height: 100vh;
                    color: ${ThemeConfig.color.writtentestclockmain};
                }
            `}</style>
        );
    }
    render() {
        return (
            <Layout>
                <div className="written-test-clock">
                    {this.props.children}
                </div>
                {this.renderGlobalCss()}
            </Layout>
        );
    }
}