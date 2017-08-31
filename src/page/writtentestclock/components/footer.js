import React from 'react';
import Theme from '../../../../config/theme';

export default class extends React.Component {
    renderGlobalCss(){
        return (
            <style global jsx>{`
                .footer-wrapper {
                    position: fixed;
                    display: flex;
                    bottom: 0;
                    height: 50px;
                    width: 100vw;
                    background: ${Theme.color.writtentestclockmain};
                    justify-content: space-around;
                    align-items: center;
                }
                .footer-item {
                    display: block;
                    color: #000;
                    height: 30px;
                    width: -webkit-fill-available;
                    text-align: center;
                    line-height: 30px;
                }
                .footer-item:not(:last-child) {
                    border-right: 2px solid #000;
                }
            `}</style>
        );
    }
    render() {
        return (
            <div className="footer-wrapper">
                <a className='footer-item'>
                    每日做题
                </a>
                <a className='footer-item'>
                    更多题目
                </a>
                <a className='footer-item'>
                    我的打卡
                </a>
                {this.renderGlobalCss()}
            </div>
        );
    }
}