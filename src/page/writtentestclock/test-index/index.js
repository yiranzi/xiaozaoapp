import React from 'react';
import ThemeConfig from '../../../../config/theme';
import { Flex, FlexItem } from 'react-weui';

export default class AnswerPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ['恭喜你！报名成功！', '离四大又近了一步', '不过，你也一定很好奇：',
                '以我现在的笔试水平，到底有多大把握进四大？', '为了避免', '你在高级班跟不上节奏的尴尬',
                '在初级班又有孤独求败的体验', '不如趁现在！', '我们花几分钟来个小测试', '搞清楚自己是报笔试基础班还是高级班吧！']
        }
    }

    renderGlobalCss = () => {
        return (
            <style jsx global>{`
                .tips-form {
                    flex: 1;
                    border: 1px solid;
                    margin: 10px;
                    position: relative;
                    padding: 20px 0;
                }
                .tips {
                    text-align: center;
                    margin: 10px 0;
                    text-shadow: 0px 7px 3px #000;
                    font-size: 15px;
                }
            `}</style>
        )
    }

    renderContent() {
        const { content } = this.state
        return content.map((item, i) => (
            <div key={i} className="tips">{item}</div>
        ))
    }

    render() {
        return (
            <div>
                <Flex >
                    <FlexItem>
                        <div className="title">小灶四大笔试七天打卡计划</div>
                    </FlexItem>
                </Flex>
                <Flex>
                    <FlexItem className='tips-form'>
                        <div className='corner-top-left corner'></div>
                        <div className='corner-top-right corner'></div>
                        <div className='corner-bottom-left corner'></div>
                        <div className='corner-bottom-right corner'></div>
                        {this.renderContent()}
                    </FlexItem>
                </Flex>
                <Flex>
                    <FlexItem>
                        <a className="img" href='/writtentestclock/test'>马上点击测试</a>
                    </FlexItem>
                    <FlexItem>
                        <a className="img" href='/writtentestclock/clock-in-intro'>直接选择班级</a>
                    </FlexItem>
                </Flex>
                {this.renderGlobalCss()}
                <style jsx>{`
                    .title {
                        font-size: 25px;
                        font-weight: bold;
                        text-align: center;
                        margin-top: 20px;
                    }
                    
                    .corner {
                        height: 20px;
                        width: 20px;
                        position: absolute;
                        border: 1px solid;
                        background: rgb(30,31,32);
                    }
                    .corner-top-left {
                        top: -1px;
                        left: -1px;
                        border-radius: 0 0 20px 0;
                        border-top: none;
                        border-left: none;
                    }
                    .corner-top-right {
                        top: -1px;
                        right: -1px;
                        border-radius: 0 0 0 20px;
                        border-top: none;
                        border-right: none;
                    }
                    .corner-bottom-left {
                        bottom: -1px;
                        left: -1px;
                        border-radius: 0 20px 0 0;
                        border-bottom: none;
                        border-left: none;
                    }
                    .corner-bottom-right {
                        bottom: -1px;
                        right: -1px;
                        border-radius: 20px 0 0 0;
                        border-bottom: none;
                        border-right: none;
                    }
                    .img {
                        color: #000;
                        display: block;
                        background-image: url(/static/writtentestclock/round-btn.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        text-align: center;
                        height: 50px;
                        width: 150px;
                        margin: 0 auto;
                        padding-right: 10px;
                        line-height: 36px;
                        margin-top: 20px;
                    }
                `}</style>
            </div>
        );
    }
}