import React from 'react'
import AxiosUtil from '../../util/axios'
import UCenterLayout from '../../containers/ucenter/layout'
import ThemeConfig from '../../config/theme'
import { Page, Cells, Cell, CellHeader, CellBody, CellFooter } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount = async () => {
    this.loadUserData()
  }

  loadUserData = async () => {
    try {
      let user = await AxiosUtil.get('/api/user')
      this.setState({
        user: user
      })
      console.log(user)
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  renderHeader () {
    const {user} = this.state
    console.log(user)
    if (user) {
      return <div>
        <img className='headimg' src={user.headimgurl} />
        <span className='nickname'>{user.nickname}</span>
        <style jsx>{`
          .headimg {
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
          .nickname {
            margin-left: 15px;
            line-height: 40px;
            vertical-align: text-bottom;
          }
        `}</style>
      </div>
    }
  }

  render () {
    return <UCenterLayout>
      <Page>
        <Cells>
          <Cell access>
            <CellBody>
              {this.renderHeader()}
            </CellBody>
          </Cell>
          <Cell access>
            <CellBody>
              <a href='/ucenter/classroom'>
              我的教室
              </a>
            </CellBody>
            <CellFooter />
          </Cell>
        </Cells>
      </Page>
      <style global jsx>{`
      `}</style>
    </UCenterLayout>
  }
}
