const http = require('http')
const https = require('https')

const factory = ({ request }) => (url, options = {}) => new Promise((resolve, reject) => {
  const { body } = options
  const newOptions = Object.assign({}, options, { body: undefined })
  const listener = (res) => {
    // Explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
    res.setEncoding('utf8')
    // Incrementally capture the incoming response body
    const chars = []
    res.on('data', c => chars.push(c))
    res.on('end', () => {
      resolve({
        body: chars.join(''),
        status: res.statusCode,
        message: res.statusMessage,
        contentType: res.headers['content-type']
      })
    })
  }
  const req = typeof url === 'string' ? request(url, newOptions, listener) : request(newOptions, listener)
  req.on('error', reject)
  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    req.write(body)
  }
  req.end()
})

const isStringHttps = str => typeof str === 'string' && str.startsWith('https')
const isUrlOptions = (url, options) => options == null && typeof url === 'object'
const asyncHttp = factory(http)
const asyncHttps = factory(https)

module.exports = async function hrap(url, options) {
  if (isStringHttps(url) || isStringHttps(options?.protocol) || isStringHttps(url?.protocol)) {
    if (isUrlOptions(url, options)) {
      return asyncHttps(null, url)
    }
    return asyncHttps(url, options)
  }
  if (isUrlOptions(url, options)) {
    return asyncHttp(null, url)
  }
  return asyncHttp(url, options)
}
