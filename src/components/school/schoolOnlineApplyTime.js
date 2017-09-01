import React from 'react';

export default class schoolOnlineApplyTime extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="school__online_time">
                    {this.props.time ? <div>预计校招时间 {this.props.time}</div> : <div>已经开启校招</div>}
                    <div className="school__online_address my-text-rowsingle"><a href={this.props.address}>{this.props.address}</a></div>
                </div>
                <style jsx>{`
                    .school__online_time {
                        color:#787886;
                        text-align:center;
                        border-top:1px solid #E6E6E6;
                        padding-top:30px;
                    }
                    .school__online_time a {
                        color:#787886;
                    }
                    .school__online_address {
                        width:300px;
                        margin: 0 auto;
                    }
                `}</style>
            </div>
        );
    }
}