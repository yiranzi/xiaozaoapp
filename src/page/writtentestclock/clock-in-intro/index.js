import React from 'react';
import Theme from '../../../../config/theme'
export default class extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showMore: false
        }
    }

    showMoreClick = () => {
        this.setState({
            showMore: true
        })
    }


    renderGlobalCss = () => {
        return (
            <style global jsx>{`
                .bg-img {
                    width: 100%;
                }
                .btn-form {
                    bottom: 0;
                    width: 100%;
                    padding-bottom: 30px;
                }
                .btn-img {
                    color: #000;
                    display: block;
                    background-image: url(/static/round-btn.png);
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
                    width: 300px;
                    margin: 0 auto;
                    color: #000;
                    background: ${Theme.color.writtentestclockmain};
                    justify-content: center;
                    align-items: center;
                    height: 40px;
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
                    border-left: 15px solid transparent;
                    border-right: 15px solid transparent;
                    border-top: 20px solid ${Theme.color.writtentestclockmain};
                    top: 30px;
                }
            `}</style>
        )
    }
    render() {
        const { showMore } = this.state
        return (
            <div>
                <img className="bg-img" src="/static/intro.jpeg" />
                <div className='btn-form'>
                    {showMore &&
                    <div className="choose-class-form">
                        <div className="choose-class">全能提升基础班</div>
                        <div className="choose-class">全能提升进阶班</div>
                        <div className="trangle"></div>
                    </div>
                    }
                    <div className="btn-img" onClick={this.showMoreClick}>开启我的笔试进阶修炼</div>
                </div>
                {this.renderGlobalCss()}
            </div>
        );
    }
}