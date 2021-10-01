const http = require('http')
const https = require('https')

const factory = ({ request }) => (uri, options = {}) => new Promise((resolve, reject) => {
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
  const req = typeof uri === 'string' ? request(uri, newOptions, listener) : request(newOptions, listener)
  req.on('error', reject)
  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    req.write(body)
  }
  req.end()
})

const isStringHttps = str => typeof str === 'string' && str.startsWith('https')
const isUriOptions = (uri, options) => options == null && typeof uri === 'object'
const asyncHttp = factory(http)
const asyncHttps = factory(https)

module.exports = async function hrap(uri, options) {
  if (isStringHttps(uri) || isStringHttps(options?.protocol) || isStringHttps(uri?.protocol)) {
    if (isUrlOptions(uri, options)) {
      return asyncHttps(null, options)
    }
    return asyncHttps(uri, options)
  }
  if (isUrlOptions(uri, options)) {
    return asyncHttp(null, options)
  }
  return asyncHttp(uri, options)
}
