import React from 'react'
import AxiosUtil from '../../util/axios'
import UCenterLayout from '../../containers/ucenter/layout'
import { Page, Cells, Cell, CellBody, CellFooter } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      studyCard: null
    }
  }

  componentDidMount = async () => {
    this.loadUserData()
    this.loadStudyCardInfo()
  }

  loadUserData = async () => {
    try {
      let user = await AxiosUtil.get('/api/user')
      this.setState({
        user: user
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  loadStudyCardInfo = async () => {
    try {
      const studyCard = await AxiosUtil.get('/api/vip/getStudyCard')
      this.setState({
        studyCard: studyCard
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  renderHeader () {
    const {user} = this.state
    if (user) {
      return (
        <div>
          <img className='headimg' src={user.headimgurl} />
          <div className='nickname'>{user.nickname}</div>
          <div className='phone'>{user.phone}
            {!user.phone &&
            <a href='/user/register'>去绑定手机号</a>
            }
          </div>
          <style jsx>{`
            .headimg {
              width: 45px;
              height: 45px;
              border-radius: 20px;
              float: left;
            }
            .nickname, .phone {
              margin-left: 55px;
            }
          `}</style>
        </div>
      )
    }
  }

  render () {
    return <UCenterLayout tabbar={2}>
      <Page>
        <Cells>
          <Cell access>
            <CellBody>
              {this.renderHeader()}
            </CellBody>
          </Cell>
          <Cell access>
            <a href='/ucenter/classroom' style={{width: '100%'}}>
              <CellBody>
                我的教室
              </CellBody>
            </a>
            <CellFooter />
          </Cell>
          <Cell access>
            <a href='/ucenter/studycard' style={{width: '100%'}}>
              <CellBody>
                我的能力卡
                <span className='wx-pull-right'>共
                  {this.state.studyCard ? (this.state.studyCard.buyCount +
                    this.state.studyCard.inviteCount) : 0}张</span>
              </CellBody>
            </a>
            <CellFooter />
          </Cell>
        </Cells>
      </Page>
      <style global jsx>{`
      `}</style>
    </UCenterLayout>
  }
}
