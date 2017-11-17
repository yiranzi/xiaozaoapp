import React from 'react'
import Layout from '../../components/layout'

import Alert from '../../containers/demo/alert'
import Audio from '../../containers/demo/audio'
import Back from '../../containers/demo/back'
import Banner from '../../containers/demo/banner'
import Button from '../../containers/demo/button'
import Card from '../../containers/demo/card'
import Checkbox from '../../containers/demo/checkbox'
import Confirm from '../../containers/demo/confirm'
import FixFooter from '../../containers/demo/fixfooter'
import Loading from '../../containers/demo/loading'
import ModalBox from '../../containers/demo/modal'
import More from '../../containers/demo/more'
import Radio from '../../containers/demo/radio'
import SwipeView from '../../containers/demo/swipeview'
// import Tabbar from '../../containers/demo/tabbar'
import TextArea from '../../containers/demo/textarea'
import TimeDown from '../../containers/demo/timedown'
import TimeUp from '../../containers/demo/timeup'
import Uploader from '../../containers/demo/uploader'
import Video from '../../containers/demo/video'
import WxRecord from '../../containers/demo/wxrecord'
import WxShare from '../../containers/demo/wxshare'
import WxShareBg from '../../containers/demo/wxsharebg'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <div className='wrapper'>
          <Audio />
          <Back />
          <Button />
          <Card />
          <Checkbox />
          <Confirm />
          <Alert />
          <Banner />
          <FixFooter />
          <Loading />
          <ModalBox />
          <More />
          <Radio />
          <SwipeView />
          {/*<Tabbar />*/}
          <TextArea />
          <TimeDown />
          <TimeUp />
          <Uploader />
          <Video />
          <WxRecord />
          <WxShare />
          <WxShareBg />
        </div>
        <style global jsx>{`
          .wrapper {
            padding: 1rem;
            padding-bottom: 5rem;
          }
          .wrapper .up {
            padding-top: 1rem;
          }
        `}</style>
      </Layout>
    )
  }
}