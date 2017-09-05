import React from 'react';
import classNames from 'classnames';

export default class SchoolNav extends React.Component {
    render() {
        let {fromType,processLink,workLink,expLink} = this.props;
        return (
            <div className="nav">
                <div>
                    <a href={processLink} className={classNames('bg',{
                        'isCurrent': fromType == 'school'
                    })}>
                        <img src="/static/school/icon/1.png"/>
                    </a>
                    <div className="logo-text">校招进度</div>
                </div>
                <div>
                    <a href={workLink} className={classNames('bg',{
                        'isCurrent': fromType == 'work'
                    })}>
                        <img src="/static/school/icon/2.png"/>
                    </a>
                    <div className="logo-text">工作体验</div>
                </div>
                <div>
                    <a href={expLink} className={classNames('bg',{
                        'isCurrent': fromType == 'exp'
                    })}>
                        <img src="/static/school/icon/3.png"/>
                    </a>
                    <div className="logo-text">面经/笔经</div>
                </div>
                <style jsx>{`
                    .bg {
                        display:inline-block;
                        padding:10px 5px;
                        border-radius:50%;
                        display:flex;
                        justify-content:space-around;
                        margin:0 10px;
                    }

                    .isCurrent {
                        background-color:#efefef;
                    }
                    img {
                        width:80%;
                        height:80%;
                    }
                    .logo-text {
                        color:#8C9097;
                        font-size:0.75rem;
                        text-align:center;
                    }
                    .nav {
                        display:flex;
                        background-color:#F9F9F9;
                        justify-content:center;
                        padding:30px 0;
                    }
                `}</style>
            </div>
        );
    }
}