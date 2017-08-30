import React from 'react';
import Footer from '../components/footer'
export default class extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className='index-clock-in-form'>
                <div className='btn-form'>
                    <a className='btn yesterday-achieve-check'></a>
                    <a className='btn former-test'></a>
                    <a className='btn today-push'></a>
                    <a className='btn test'></a>
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