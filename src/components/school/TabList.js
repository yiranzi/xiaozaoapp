import React from 'react';
import {
    Tab,
    TabBody,
    NavBar,
    NavBarItem,
    Article
} from 'react-weui';
import List from '../../components/school/list';

export default class TabList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0
        };
    }

    render() {
        return (
            <Tab style={{borderTop: '1px solid #efefef'}}>
                <NavBar>
                    <NavBarItem active={this.state.tab == 0} onClick={e => this.setState({tab: 0})}>全部</NavBarItem>
                    <NavBarItem active={this.state.tab == 1} onClick={e => this.setState({tab: 1})}>网申</NavBarItem>
                    <NavBarItem active={this.state.tab == 2} onClick={e => this.setState({tab: 2})}>笔试</NavBarItem>
                    <NavBarItem active={this.state.tab == 3} onClick={e => this.setState({tab: 3})}>面试</NavBarItem>
                    <NavBarItem active={this.state.tab == 4} onClick={e => this.setState({tab: 4})}>综合经验</NavBarItem>
                </NavBar>
                <TabBody>
                    <div style={{display: this.state.tab == 0 ? null : 'none'}}>
                        <List list={this.props.all}/>
                    </div>
                    <div style={{display: this.state.tab == 1 ? null : 'none'}}>
                        <List list={this.props.onlineApply}/>
                    </div>
                    <div style={{display: this.state.tab == 2 ? null : 'none'}}>
                        <List list={this.props.exam}/>
                    </div>
                    <div style={{display: this.state.tab == 3 ? null : 'none'}}>
                        <List list={this.props.interview}/>
                    </div>
                    <div style={{display: this.state.tab == 4 ? null : 'none'}}>
                        <List list={this.props.comphensive}/>
                    </div>
                </TabBody>
            </Tab>
        );

    }
}
