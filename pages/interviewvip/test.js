import React from 'react'
import InterviewLayout from '../../containers/interviewvip/layout'
import More from '../../components/more'

export default class extends React.Component {
  render () {
    const content = (
      <div>
        <p>1111asdfasdfasdfasdfasdfasdasdfasdfasdasdfasdf1111</p>
        <p>2222asdfasdfasdfasdfasdfasdasdfasdfasdasdfasdf222</p>
        <p>3333asdfasdfasdfasdfasdfasdasdfasdfasdasdfasdf333</p>
        <p>4444asdfasdfasdfasdfasdfasdasdfasdfasdasdfasdf444</p>
        <p>5555asdfasdfasdfasdfasdfasdasdfasdfasdasdfasdf555</p>
        <p>6666asdfasdfasdfasdfasdfasdasdfasdfasdasdfasdf666</p>
        <p>7777asdfasdfasdfasdfasdfasdasdfasdfasdasdfasdf777</p>
      </div>
    )
    return (
      <InterviewLayout>
        <More
          title='title'
          content={content}
          height={100}
        />
      </InterviewLayout>
    )
  }
}
