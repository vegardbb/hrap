const http = require('http')
const https = require('https')

const factory = ({ request }) => (url, options = {}) => new Promise((resolve, reject) => {
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
  const req = typeof url === 'string' ? request(url, options, listener) : request(options, listener)
  req.on('error', reject)
  const { body } = options
  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    req.write(body)
  }
  req.end()
})

const isStringHttps = str => typeof str === 'string' && str.startsWith('https')
const asyncHttp = factory(http)
const asyncHttps = factory(https)

module.exports = async function hrap(url, options) {
  if (typeof url === 'object') {
    if (isStringHttps(url?.protocol)) {
      return asyncHttps(null, url)
    }
    return asyncHttp(null, url)
  }
  if (isStringHttps(options?.protocol) || isStringHttps(url)) {
    return asyncHttps(url, options)
  }
  return asyncHttp(url, options)
}
