import React from 'react';

export default class ShareWx extends React.Component {
    render() {

        return (
            <div>
                {
                    this.props.isShow &&
                    <img src="/static/sharebg.png" className="share-img"/>
                }
                <style jsx >{`
                    .share-img {
                        position: absolute;
                    }
                `}</style>
            </div>
        );
    }
}