import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-nav">
                    <a href="/school/kpmg/schoolExp/index.html">毕马威</a>
                    <a href="/school/anyong/schoolExp/index.html">安永</a>
                    <a href="/school/pwccn/schoolExp/index.html">普华永道</a>
                    <a href="/school/de/schoolExp/index.html">德勤</a>
                    <a href="javascript:;">更多提示</a>
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