import React from 'react';

export default class ShareWx extends React.Component {
    constructor(props) {
        super(props);

        const {isShow} = this.props;
        this.state = {
            isShow: isShow
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.state.isShow = nextProps.isShow;
    }

    shareHide = () => {
        this.setState({
            isShow: false
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.isShow &&
                    <img src="/static/writtentestclock/sharebg.png" className="share-img" onClick={this.shareHide}/>
                }
                <style jsx>{`
                    .share-img {
                        position: absolute;
                        z-index: 999;
                        width: 100%;
                    }
                `}</style>
            </div>
        );
    }
}
