import React from 'react';
import Theme from '../../../../config/theme'
export default class extends React.Component {
    render() {
        return (
            <div className='class-choose-form'>
                <div className='class-choose-title-bg'></div>
                <div className='class-choose-title'>您已经成功选择班级!</div>
                
                <div className='class-choose-content'>
                    <div className='sub-form'>
                        <div className='sub-title'>你的学号是：</div>
                        <div className='sub-content-id'>userid</div>
                    </div>
                    <div className='sub-form'>
                        <div className='sub-title'>你的学习群：</div>
                        <div>请扫描二维码，进入你的专属学习群</div>
                    </div>
                    <div className='sub-form'>
                        <div className='sub-title'>二维码：</div>
                        <div className='qr-code'></div>
                    </div>
                </div>
                <a className='go-clock-in' href=''></a>

                <style jsx>{`
                    .class-choose-form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .class-choose-title {
                        position: absolute;
                        color: #fff;
                        font-size: 30px;
                        font-weight: bold;
                        text-shadow: 5px 5px 10px grey;
                        margin: 2rem 0;
                    }
                    .class-choose-title-bg {
                        height: 100px;
                        border-left: 100vw solid ${Theme.color.writtentestclockmain};
                        border-bottom: 26px solid transparent;  
                    }
                    .class-choose-content {
                        width: 18rem;
                        margin-top: 10px;
                    }
                    .sub-form {
                        margin: 35px 0;
                    }
                    .sub-title {
                        color: #fff;
                        height: 30px;
                    }
                    .sub-content-id {
                        height: 25px;
                        border: 1px solid ${Theme.color.writtentestclockmain};
                        border-radius: 30px;
                        background: #fff;
                        text-align: center;
                        line-height: 25px;
                        margin: 0 -10px;
                    }
                    .qr-code {
                        text-align: center;
                        border: 1px solid ${Theme.color.writtentestclockmain};
                        background: #fff;
                        width: 130px;
                        height: 130px;
                        margin: 0 auto;
                        margin-top: -30px;
                    }
                    .go-clock-in {
                        width: 12rem;
                        height: 4rem;
                        display: block;
                        text-align: center;
                        color: #fff;
                        background-image: url(/static/go-clock-in.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                `}</style>
            </div>
        );
    }
}