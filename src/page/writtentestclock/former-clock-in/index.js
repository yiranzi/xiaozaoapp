import React from 'react';
import Theme from '../../../../config/theme';
import Footer from '../components/footer'
export default class extends React.Component {

    constructor(props) {
        super(props)
        let obj = {}
        obj.list = []
        let {startDay, endDay, completeDay} = props.info
        const duringDay = Math.ceil((endDay - startDay)/3600/24/1000)

        for(let i = 0; i < duringDay; i++) {
            const date = new Date(startDay)
            const Month = date.getMonth()+1
            const Day = date.getDate()
            obj.list.push({
                date: `${Month}月${Day}日`,
                day: `day${i+1}`,
                check: completeDay[i] ? 'check' : 'cross'
            })
            startDay += 3600*24*1000
        }

        this.state = obj
    }
    renderItem = (item, index) => {
        return (
            <div className='clock-in-item' key={index}>
                <div className='content'>
                    <div>{item.date}</div>
                    <div>{item.day}</div>
                    <div className={item.check}></div>
                </div>
            </div>
        )
    }

    renderGlobalCss() {
        return (
            <style jsx global>{`
                .written-test-clock {
                    padding: 0!important;
                }
                .clock-in-form {
                    display: flex;
                    align-items: center;
                    
                    height: 100vh;
                }
                .clock-in-list {
                    width: 100%;
                    height: 90vh;
                    background: rgb(30, 31, 32);
                    border: 1px solid ${Theme.color.writtentestclockmain};
                    padding: 0 20px;
                    margin: 0 30px;
                }
                .clock-in-item {
                    position: relative;
                    height: 80px;
                    border-bottom: 1px dashed ${Theme.color.writtentestclockmain};
                }
                .clock-in-item:first-child:before {
                    content: '';
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
                .clock-in-item:first-child:after {
                    content: '';
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
                    background-image: url(/static/check.png);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    height: 50px;
                    width: 50px;
                }
                .cross{
                    background-image: url(/static/cross.png);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    height: 50px;
                    width: 50px;
                }
            `}</style>  
        )
    }

    render() {
        return (
            <div className='clock-in-form'>

                <div className='clock-in-list'>
                    {this.state.list.map((item, index) => this.renderItem(item, index))}
                </div>
                <Footer/>
                {this.renderGlobalCss()}
            </div>
        );
    }
}