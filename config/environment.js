const config = {
  development: {
    api_url: 'http://rcweb.review.xiaozao.org'
  },
  production: {
    api_url: 'https://www.xiaozao.org'
  }
}

module.exports = config[process.env.NODE_ENV]