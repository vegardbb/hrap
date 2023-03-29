const http = require('http')
const https = require('https')

const getResponseEncoding = (res) => {
  const contentType = res.headers['content-type']
  const allLowercase = contentType?.toLowerCase()
  if (allLowercase?.includes('iso-8859-1')) {
    return 'latin1'
  }
  return 'utf8'
}

const factory = ({ request }) => (url, options = {}) => new Promise((resolve, reject) => {
  const listener = (res) => {
    // Explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
    res.setEncoding(getResponseEncoding(res))
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
  const req = url == null ? request(options, listener) : request(url, options, listener)
  req.on('error', reject)
  const { body } = options
  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    req.write(body)
  }
  req.end()
})

exports.http = factory(http)
exports.https = factory(https)
