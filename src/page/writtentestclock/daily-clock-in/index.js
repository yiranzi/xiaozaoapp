import React from 'react';
import Theme from '../../../../config/theme';
export default class extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dates: [true, false, true, false, true, false, true]
        }
    }
    
    renderDate = () => {
        return this.state.dates.map((item, index) => {
            const classname = 'date-item ' + (item && 'checked')
            return (
                <div className={classname}>{index + 1}</div>
            )
        })
    }
    
    renderGlobalCss() {
        return (
            <style jsx global>{`
                .daily-clock-in-form {
                    display: flex;
                    align-items: center;
                    height: 100vh;
                    flex-direction: column;
                }
                .sub-form {
                    width: 90vw;
                    padding: 0 10px;
                    margin-bottom: 30px;
                }
                .sub-form:first-child {
                    margin-top: 100px;
                }
                .date-form {
                    display: flex;
                }
                .date-item {
                    height: 52px;
                    width: -webkit-fill-available;
                    margin-right: 1px;
                    background: rgb(191, 192, 193);
                    color: #fff;
                    text-align: center;
                    line-height: 52px;
                }
                .checked {
                    background: ${Theme.color.writtentestclockmain};
                }
                .content-wrapper {
                    padding: 25px 15px;
                    border: 1px solid ${Theme.color.writtentestclockmain};
                    position: relative;
                }
                .wrapper-trangle {
                    position: absolute;
                    border-left: 15px solid transparent;
                    border-right: 15px solid transparent;
                    border-bottom: 20px solid ${Theme.color.writtentestclockmain};
                    top: -20px;
                    left: 65px;
                }
                .wrapper-trangle span {
                    display: block;
                    position: absolute;
                    border-left: 15px solid transparent;
                    border-right: 15px solid transparent;
                    border-bottom: 20px solid rgb(29, 29, 29);
                    top: 2px;
                    left: -15px;
                }
                .qr-code {
                    background: #fff;
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    right: 20px;
                    top: 15px;
                    border: 1px solid ${Theme.color.writtentestclockmain};
                }
                .score-content {
                    height: 50px;
                    line-height: 50px;
                }
            `}</style>
        )
    }

    render() {
        return (
            <div className='daily-clock-in-form'>
                <div className='sub-form'>
                    <div className='title'>打卡记录</div>
                    <div className='date-form'>{this.renderDate()}</div>
                </div>
                <div className='sub-form'>
                    <div className='title'>我的信息</div>
                    <div className='content-wrapper'>
                        学号：100050
                        <div className='wrapper-trangle'><span></span></div>
                        <div className='qr-code'></div>
                    </div>
                </div>
                <div className='sub-form'>
                    <div className='title'>我的成绩</div>  
                    <div className='content-wrapper'>
                        <div className='wrapper-trangle'><span></span></div>
                        <div className='score-content'>入学前测评：</div>
                        <div className='score-content'>活动后测试：</div>
                    </div> 
                </div>
                {this.renderGlobalCss()}
               
            </div>
        );
    }
}