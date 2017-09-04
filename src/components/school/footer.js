import React from 'react';
import { Dialog } from 'react-weui';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            style: {
                buttons: [
                    {
                        label: '知道了',
                        onClick: this.hideDialog.bind(this)
                    }
                ]
            }
        };
    }

    hideDialog() {
        this.setState({
            showDialog: false
        });
    }

    render() {
        return (
            <div className="footer">
                <div className="footer-nav">
                    <a href="/school/kpmg/schoolprocess/index.html">毕马威</a>
                    <a href="/school/anyong/schoolprocess/index.html">安永</a>
                    <a href="/school/pwccn/schoolprocess/index.html">普华永道</a>
                    <a href="/school/de/schoolprocess/index.html">德勤</a>
                    <a onClick={e => this.setState({showDialog:true})}>更多提示</a>
                    <Dialog type="ios" buttons={this.state.style.buttons} show={this.state.showDialog}>
                        更多公司的校招信息和求职干货 会在9月初【校招助手移动端】一同上线
                    </Dialog>
                </div>
                <style jsx>{`
                    .footer-nav {
                        background-color:#F6F6F6;
                        position:fixed;
                        bottom:0;
                        display:flex;
                        width:100vw;
                    }
                    .footer-nav a {
                        flex:1;
                        text-align:center;
                        color:black;
                        padding:5px;
                    }
                `}</style>
            </div>
        );
    }
}