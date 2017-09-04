import React from 'react';
import Footer from '../components/footer'
import { Toptips } from 'react-weui'
export default class extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className='index-clock-in-form'>
                <div className='btn-form'>
                    <a href='/writtentestclock/pastanswer' className={`btn yesterday-achieve`}></a>
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
                        background-image: url(/static/writtentestclock/yesterday-achieve-check.png);
                    }
                    .yesterday-achieve-cross {
                        background-image: url(/static/writtentestclock/yesterday-achieve-cross.png);
                    }
                    .yesterday-achieve {
                        background-image: url(/static/writtentestclock/yesterday-achieve.png);
                    }

                    .former-test {
                        background-image: url(/static/writtentestclock/former-test.png);
                    }
                    .today-push {
                        background-image: url(/static/writtentestclock/today-push.png);
                    }
                    .test {
                        background-image: url(/static/writtentestclock/test.png);
                    }
                `}</style>
            </div>
        );
    }
}