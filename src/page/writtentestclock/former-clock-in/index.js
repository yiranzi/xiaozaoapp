import React from 'react';
import Theme from '../../../../config/theme';
export default class extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [{
                date: '8月1日',
                day: 'day1',
                check: 'check'
            }, {
                date: '8月1日',
                day: 'day1',
                check: 'check'
            }, {
                date: '8月1日',
                day: 'day1',
                check: 'check'
            }, {
                date: '8月1日',
                day: 'day1',
                check: 'check'
            }]
        }
    }
    renderItem = (item, index) => {
        return (
            <div className='clock-in-item' key={index}>
                <div className='left-round'></div>
                <div className='content'>
                    <div>{item.date}</div>
                    <div>{item.day}</div>
                    <div className={item.check}></div>
                </div>
                <div className='right-round'></div>
            </div>
        )
    }

    render() {
        return (
            <div className='clock-in-form'>

                <div className='clock-in-list'>
                    {this.state.list.map((item, index) => this.renderItem(item, index))}
                </div>
                <style>{`
                    .clock-in-form {
                        display: flex;
                        align-items: center;
                        padding: 0 30px;
                        height: 100vh;
                        
                    }
                    .clock-in-list {
                        width: 100%;
                        height: 90vh;
                        background: rgb(30, 31, 32);
                        border: 1px solid ${Theme.color.writtentestclockmain};
                        padding: 0 20px;
                    }
                    .clock-in-item {
                        position: relative;
                        height: 80px;
                        border-bottom: 1px dashed ${Theme.color.writtentestclockmain};
                    }
                    .left-round {
                        position: absolute;
                        display: block;
                        top: 70px;
                        left: -21px;
                        border: 1px solid;
                        border-left: none;
                        width: 10px;
                        background: rgb(30, 31, 32);
                        height: 20px;
                        border-radius: 0 20px 20px 0;
                    }
                    .right-round {
                        position: absolute;
                        display: block;
                        top: 70px;
                        right: -21px;
                        border: 1px solid;
                        border-right: none;
                        width: 10px;
                        background: rgb(30, 31, 32);
                        height: 20px;
                        border-radius: 20px 0 0 20px;
                    }
                    .content {
                        display: flex;
                        justify-content: space-around;
                        font-size: 30px;
                        height: 70px;
                        align-items: flex-end;
                    }
                    .check{
                        background-image: url(/static/wq_03.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        height: 50px;
                        width: 50px;
                    }
                `}</style>
            </div>
        );
    }
}