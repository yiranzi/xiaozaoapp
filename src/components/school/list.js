import React from 'react';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <div>
                    {this.props.list.map((item, key) =>
                        <div className="list-block" key={key}>
                            <a href={item.link}>{item.title}</a>
                            <span className="time">{item.publishTime}</span>
                        </div>
                    )}
                </div>
                <style jsx>{`
                    .list-block a {
                        color:#84858E;
                        font-size:0.8rem;
                        display:block;
                        width:200px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        flex:2;
                        padding-right:20px;
                    }
                    .list-block {
                        border-top: 1px solid #E9E9E9;
                        padding:20px;
                        display:flex;
                    }
                    .list-block .time {
                        color:#84858E;
                        font-size:0.8rem;
                        flex:1;
                        text-align:end;
                    }
                `}</style>
            </div>

        );
    }
}