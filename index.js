const http = require('http')
const https = require('https')

const factory = ({ request }) => (uri, options = {}) => new Promise((resolve, reject) => {
  const { body } = options
  const req = request(uri, Object.assign({}, options, { body: undefined }), (res) => {
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
  })
  req.on('error', reject)
  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    req.write(body)
  }
  req.end()
})

exports.http = factory(http)
exports.https = factory(https)
