import React from 'react';
import Theme from '../../../../config/theme'
export default class extends React.Component {
    render() {
        return (
            <div className='class-choose-form'>
                <div className='class-choose-title'>
                    您已成功选择班级！
                </div>
                <div className='trangle'></div>
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
                        width: 100vw;
                        text-align: center;
                        color: #fff;
                        font-size: 30px;
                        font-weight: bold;
                        background: ${Theme.color.writtentestclockmain};
                        text-shadow: 5px 5px 10px grey;
                        height: 7rem;
                        line-height: 8rem;
                    }
                    .class-choose-content {
                        width: 18rem;
                        margin-top: 10px;
                    }
                    .trangle {
                        border-top: 30px solid #45cd17;
                        border-right: 100vw solid transparent;
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
                        width: 180px;
                        height: 60px;
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