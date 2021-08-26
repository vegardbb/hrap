const http = require('http')
const https = require('https')

/**
 * Promise-wrapper for {http/https}.request
 * @param {String} uri - The logical identifier for the resource. Internally, NodeJS
 * parses the string using url.parse and merges it with the given options object
 * @param {Object} options - The configuration of the request
 * @see [NodeJS API]{@link https://nodejs.org/docs/latest-v14.x/api/http.html#http_http_request_options_callback}
 * documentation for an extensive list of valid properties.
 * @returns {Promise<Object>} A simple summary of the received response
 * @throws if the 'error' event is fired on the request
 */
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
