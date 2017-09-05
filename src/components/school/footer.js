import React from 'react';
import classNames from 'classnames';

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
        let { fromType } = this.props;
        return (
            <div className="footer">
                <div className="footer-nav">
                    <a href="/school/kpmg/schoolprocess/index.html" className={classNames('a__bg',{'isActive': fromType == 'kpmg'})}>毕马威</a>
                    <a href="/school/anyong/schoolprocess/index.html" className={classNames('a__bg',{'isActive': fromType == 'anyong'})}>安永</a>
                    <a href="/school/pwccn/schoolprocess/index.html" className={classNames('a__bg',{'isActive': fromType == 'pwccn'})}>普华永道</a>
                    <a href="/school/de/schoolprocess/index.html" className={classNames('a__bg',{'isActive': fromType == 'de'})}>德勤</a>
                    <a onClick={() => alert("更多公司的校招信息和求职干货 会在9月初【校招助手移动端】一同上线")} className="a__bg">更多企业</a>
                </div>
                <style jsx>{`
                    .footer-nav {
                        background-color:#F6F6F6;
                        position:fixed;
                        bottom:0;
                        display:flex;
                        width:100vw;
                    }
                    .a__bg {
                        flex:1;
                        text-align:center;
                        color:black;
                        padding:15px 5px;
                        font-size:0.8rem;
                    }
                    .isActive {
                        background-color:#EEEEEE;
                    }
                `}</style>
            </div>
        );
    }
}