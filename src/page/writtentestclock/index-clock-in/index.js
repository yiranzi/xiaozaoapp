import React from 'react';
import Footer from '../components/footer'
export default class extends React.Component {

    constructor(props) {
        super(props)
        const { status } = this.props.info
        let showYesterday = status != 10002
        this.state = {
            showYesterday: showYesterday
        }
    }
    
    render() {
        const { showYesterday } = this.state
        return (
            <div className='index-clock-in-form'>
                <div className='btn-form'>
                    {showYesterday && 
                    <a href='/writtentestclock/pastanswer' className={`btn yesterday-achieve`}></a>}
                    <a href='/writtentestclock/former-clock-in' className='btn former-test'></a>
                    <a href='/writtentestclock/answer' className='btn today-push'></a>
                    <a href='/writtentestclock/test' className='btn test'></a>
                </div>
                <Footer/>
                <style jsx>{`
                
                    .index-clock-in-form {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        flex-direction: column;
                    }
                    .btn-form {
                        display: flex;
                        flex-direction: column;
                    }
                    .btn {
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        width: 15rem;
                        height: 5rem;
                        margin: 10px 0;
                    }
                    .yesterday-achieve-check {
                        background-image: url(/static/yesterday-achieve-check.png);
                    }
                    .yesterday-achieve-cross {
                        background-image: url(/static/yesterday-achieve-cross.png);
                    }
                    .yesterday-achieve {
                        background-image: url(/static/yesterday-achieve.png);
                    }

                    .former-test {
                        background-image: url(/static/former-test.png);
                    }
                    .today-push {
                        background-image: url(/static/today-push.png);
                    }
                    .test {
                        background-image: url(/static/test.png);
                    }
                `}</style>
            </div>
        );
    }
}