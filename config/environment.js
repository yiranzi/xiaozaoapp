const environment = {
  api_url: {
    development: 'http://rcweb.review.xiaozao.org',
    production: 'https://www.xiaozao.org'
  }
}

environment.getApiUrl = function () {
  return environment.api_url[process.env.NODE_ENV]
}

module.exports = environment