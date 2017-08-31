import React from 'react';
import Layout from '../../../components/layout';
import ThemeConfig from '../../../../config/theme';
import {Toptips} from 'react-weui';

export default class WrittenTestClock extends React.Component {
    renderGlobalCss(){
        return (
            <style global jsx>{`
                .written-test-clock {
                    background: url('/static/bg.jpg');
                    min-height: 100vh;
                    color: ${ThemeConfig.color.writtentestclockmain};
                    padding: 1rem;
                    background-size: 100%;
                }
            `}</style>
        );
    }
    render() {
        const {error} = this.props;
        return (
            <Layout>
                <div className="written-test-clock">
                    {error && <Toptips type="warn" show={true}>{error}</Toptips>}
                    {this.props.children}
                </div>
                {this.renderGlobalCss()}
            </Layout>
        );
    }
}