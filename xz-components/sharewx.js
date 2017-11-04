import React from 'react'
import AxiosUtil from '../util/axios'
import {render, unmountComponentAtNode} from 'react-dom'

export default class ShareWxDom extends React.Component {
  componentDidMount = async () => {
    const url = `/api/interview/getWXConfig?url=${location.href.split('#')[0]}`
    let wxConfig = await AxiosUtil.get(url)
    wxConfig.jsApiList = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
    // eslint-disable-next-line
    wx.config(wxConfig)
    // eslint-disable-next-line
    let { title, desc, link, imgUrl } = this.props
    // eslint-disable-next-line
    wx.ready(function () {
      console.log('微信认证成功')
      // eslint-disable-next-line
      wx.onMenuShareTimeline({
        title: title,
        link: 'http://rcwx.review.xiaozao.org/interviewvip/list',
        imgUrl: 'https://www.baidu.com/img/bd_logo1.png', // 分享图标
        success: function () {
          alert('分享成功')
        },
        cancel: function () {
          alert('取消分享')
        }
      })
      wx.onMenuShareAppMessage({
        title: title,
        link: 'http://rcwx.review.xiaozao.org/interviewvip/list',
        imgUrl: 'https://www.baidu.com/img/bd_logo1.png', // 分享图标
        success: function () {
          alert('分享成功')
        },
        cancel: function () {
          alert('取消分享')
        }
      })
      wx.onMenuShareQQ({
        title: title,
        link: 'http://rcwx.review.xiaozao.org/interviewvip/list',
        imgUrl: 'https://www.baidu.com/img/bd_logo1.png', // 分享图标
        success: function () {
          alert('分享成功')
        },
        cancel: function () {
          alert('取消分享')
        }
      })
      wx.onMenuShareWeibo({
        title: title,
        link: 'http://rcwx.review.xiaozao.org/interviewvip/list',
        imgUrl: 'https://www.baidu.com/img/bd_logo1.png', // 分享图标
        success: function () {
          alert('分享成功')
        },
        cancel: function () {
          alert('取消分享')
        }
      })
      wx.onMenuShareQZone({
        title: title,
        link: 'http://rcwx.review.xiaozao.org/interviewvip/list',
        imgUrl: 'https://www.baidu.com/img/bd_logo1.png', // 分享图标
        success: function () {
          alert('分享成功')
        },
        cancel: function () {
          alert('取消分享')
        }
      })
    })
    // eslint-disable-next-line
    wx.error(function (res) {
      console.log('微信认证失败')
      console.log(res)
    })
  }
  render () {
    return (
      <div className='share-wx'>
        <div className='icon'>
          <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhQAAAC5CAYAAABwZ6b8AAAgAElEQVR4nO3de7wd470/8M9XXFqqiRZVVQnq0qIJfkV7DklcWo5Woj2oNoSiUqHBkeC4JOWgKHGpS90SejtFG7cqilDalIbEnfZo4lYkaidEaVQ+vz+eZzLPmj2zZmbd196f9+s1r73WrGeeefbaa6/5znMFRERERKogOYrkTL9NIzm43WUSERGRLkJyOHvrITmw3WUTERGRLkByoA8e0sxpd/lERESkw/lgYk5GMBGZ1u5yioiISAfz/SWKUFAhIiIivfmOl2WMbXeZRUREpIMwvRNmrhXaXXARERHpKIv8VvYYERERERERERERERERERERERERERHJ40d/zCQ5PO11jfIQERGRIkYEWy8KKERERKRuCihERESkiGH+59y0FxVQiIiISBGD/M/USawUUIiIiEjdFFCIiIiIiIiISPOR7PHrgA1sd1lERESkS0Wrima9riYPERERKWI+tKqoiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIh0L5JT/cJgWhRMREREahOsMjq03WURERGRLkRyqA8mevLSarVRERERyTLC/7w3L6ECChEREckyzP+c29ZSiIiISPciOc83eQxvd1lERESkC5Ec7IMJFkmvJg8RERFJM8L/vLdIYgUUIiIiUs2NRRJZs0shIiLSaUhOTtl9LwCY2X2tLY2IiIh0nWBuhWpmaiKnclZsdwFERETq4aeEng5gCIARZra4Wnoze5TkaMRDIgFgkH8e/RwBYDSARxtfYhEREekoJEcFU0OzEetN+NENw7V2hYiISB9HciDJGUEgMU9zJYiIiEhhvg9EWCsxtZ21CQpkREREukwimGh7rYRvcumIsoiIiEgBvpkjCibmdEIfB1+mmUFtyTSSg9tdLhEREckQTAXdEcFEiOTkIKjoUW2FiIiI1MSPDAn7dqRNniUiIiJSXUoTSFcFFapZERER6SBBE0hPu8tSVFDmsbUcr5kyRUREGszMvkdyUbvLUZTvk3KUfzq/jUURERGRbkVyQtThtd1lERERkS7l59GoublDRERE+jk/OqWr+nuIiIhIhwlqJya0uywiIiLShcKpw9tdFhERkabx1fFdNZdDNwnmzND8EyIi0nf15QseyaEdUIaxauoQEZE+L5hsqU9d9IJhmlPbXZZGWaHdBRAREaniXv9zRBvL0AzRpFdHUauTioiINF9fHdIYjK7oM7UUIiIiHYvkjL7Yj8L3XyDdCqUdtRy7iIhInxMMbZzW7rI0GuPlzjVDpYiISLMFzQN96k6e5FT/e81od1lERET6vGBURF8b7TGUsT4VLImIiHQckgP9ENI+1Y8CqKh9GdWk/Af3xfdNREREAkGzR8NnBPXBRNRPo+0TaYmIiEiT+NqX4Y1u8vD5zvHBxBw1qYiIiEgpCiZERESkLolgYp6CCRERESnF95kIaybUb0JERESK80NQow6YM1QzISIiUgN/EZ3cXy+kvmPnzL42V4eIiEjL+H4D0d15jy6qIiIiUhMfVEQLiUUdEvttjYWIiIjUwU/T3RMEFj0KLERERKQ0X1sxNSWwUFAhIiIi5TBeA6Snk+dkoFuivddaHr62ZQa1GqmIiIhU44OeqAZlcBBEhHpIDm53WUVERKQD+ZqJacw2xwcYHR9MWLsLICIi0kl808ON/ukiAPcCmOsfz/X755vZ8wXzGwhgNIAhftcI/3hI6gHu3PcCuLHoOURERKTDsHLJ72rGFsxvQpU85jGeKntas3+3Zlqx3QUQERHpJL5WYA3ATWcNYBjiGoUhQdJFBbO8EcCg4PlcuBqOR/05xgKYjrj2Q0RERERERERERERERERERERERERERERERERERERERERERERERERERESkRZixXLmIiIhIISSHRut4tLssIiIi0oVIDvQLglE1FCIiIlKTYGXRme0ui4iIiHQhktN8MNFDcmC7yyMiIiJdJggm6JdEFxERESmO5NQgmBjb7vKIiIhIF/JNHAomREREpHZ+mKiaOURERERERERERERERERERERERERE0vhptCdokioRERGpiQ8kouGg09pdHhEREekiJMcGi3tF02hrkS8RERHJR3J4IpCgnwFTzR0iIiJSne8nMTMRSEwjObjdZRMREZEu4We5jMxUICEiIiI10dTZIiIiIiIiItJ4JEf5fhBqwhAREZHifLPFtGDuiIiGfIqIiEg2H0RMTRnuOc/vV78IERERyebnjQj1+BoKBREiIiJSDMnBvo/ENDVrtIa1uwAiIiJ5fM3CIABzzWxxu8sjva3Y7gKIiIiESA4HMAzAEP9zRPDydAAHtbxQIiIi0vn8FNdz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' />
        </div>
        <style jsx >{`
          .share-wx {
            width: 100%;
            height: 100%;
            padding: 2rem 1rem;
            box-sizing: border-box;
            background: rgba(0,0,0, 0.5);
            opacity: 0.5;
            position: fixed;
            z-index: 999;
            left: 0;
            top: 0;
          }
          .share-wx .icon img {
            width: 100%;
          }
        `}</style >
      </div>
    )
  }
}

export function ShareWx (properties) {
  document.body.children[0].classList.add('xz-sharewx-blur')
  let divTarget = document.createElement('div')
  divTarget.id = 'xz-wx'
  document.body.appendChild(divTarget)
  render(<ShareWxDom {...properties} />, divTarget)
}
