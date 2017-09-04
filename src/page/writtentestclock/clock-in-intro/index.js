import React from 'react';
import Theme from '../../../../config/theme'
import classnames from 'classnames'
import { Toptips } from 'react-weui'
import UserAction from '../../../../src/action/writtentestclock/user';
export default class extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showMore: false,
            isAdvanced: 0,
            showTips: false,
            tipsMsg: '',
            showPage: false
        }
    }

    componentDidMount() {
        const _this = this;
        UserAction.getInfo()
        .then((info) => {
            const { evaluationResult } = info
            _this.setState({
                info,
                showPage: true,
                isAdvanced: evaluationResult ? evaluationResult > 65 ? 2 : 1 : 0,
            });
        })
        .catch(error => {
            _this.setState({
                error: true,
                showPage: true,
                tipsMsg: error.message,
                showTips: true
            });
        })

    }

    showMoreClick = () => {
        this.setState({
            showMore: !this.state.showMore
        })
    }


    renderGlobalCss = () => {
        return (
            <style global jsx>{`
                .written-test-clock {
                    padding: 0!important;
                }
            `}</style>
        )
    }

     chooseClass = async (isAdvanced) => {
        try{
            const result = await UserAction.selectGroups({ group: isAdvanced ? 'H' : 'N'})
            location.href='/writtentestclock/choose-class'
        } catch(error) {
            clearTimeout(this.timeout)
            this.setState({
                tipsMsg: error.message,
                showTips: true
            })
            this.timeout = setTimeout(() => this.setState({showTips: false}), 2000)
        }
    }

    render() {
        const { showMore, isAdvanced, showTips, tipsMsg, showPage } = this.state
        if(!showPage) return <div></div>
        return (
            <div>
                <img className="bg-img" src="/static/writtentestclock/intro.jpeg" />
                <div className='btn-form'>
                    {showMore &&
                    <div className="choose-class-form">
                        <div className={classnames('choose-class', { "recommend-left": isAdvanced == 1 })} 
                            onClick={() => this.chooseClass(false)}>全能提升基础班</div>
                        <div className={classnames('choose-class', { "recommend-right": isAdvanced == 2 })} 
                            onClick={() => this.chooseClass(true)}>全能提升进阶班</div>
                        <div className="trangle"></div>
                    </div>
                    }
                    <div className="btn-img" onClick={this.showMoreClick}>开启我的笔试进阶修炼</div>
                </div>
                <Toptips type="warn" show={showTips}> {tipsMsg} </Toptips>
                <style jsx>{`
                    .bg-img {
                        width: 100%;
                    }
                    .btn-form {
                        bottom: 0;
                        width: 100%;
                        padding-bottom: 10px;
                        position: fixed;
                    }
                    .btn-img {
                        color: #000;
                        display: block;
                        background-image: url(/static/writtentestclock/round-btn.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        text-align: center;
                        height: 50px;
                        width: 220px;
                        margin: 0 auto;
                        padding-right: 10px;
                        line-height: 36px;
                        margin-top: 20px;
                    }
                    .choose-class-form {
                        position: relative;
                        display: flex;    
                        width: 340px;
                        margin: 0 auto;
                        color: #000;
                        background: ${Theme.color.writtentestclockmain};
                        justify-content: center;
                        align-items: center;
                        height: 40px;
                        border-radius: 20px;
                    }
                    .choose-class {
                        padding: 5px 15px;
                        height: 10px;
                        line-height: 10px;
                    }
                    .choose-class:first-child {
                        border-right: 1px solid #000;
                    }
                    .trangle {
                        display: block;
                        position: absolute;
                        border-left: 20px solid transparent;
                        border-right: 20px solid transparent;
                        border-top: 20px solid ${Theme.color.writtentestclockmain};
                        top: 30px;
                    }
                    .recommend-left:before {
                        content: '';
                        background-image: url(/static/writtentestclock/recommend.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        height: 40px;
                        width: 40px;
                        display: block;
                        top: 0;
                        left: 0;
                        position: absolute;
                    }
                    .recommend-right:before {
                        content: '';
                        background-image: url(/static/writtentestclock/recommend.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        height: 40px;
                        width: 40px;
                        display: block;
                        top: 0;
                        right: 0;
                        position: absolute;
                    }
                
                `}</style>
                {this.renderGlobalCss()}
            </div>
        );
    }
}