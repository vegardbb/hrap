/**
 * Promise-wrapper for {http/https/http2}.request
 * @param {String} uri - The logical identifier for the resource. Internally, NodeJS
 * parses the string using url.parse and merges it with the given options object
 * @param {Object} options - The configuration of the HTTPS request
 * @see [NodeJS API]{@link https://nodejs.org/docs/latest-v14.x/api/http.html#http_http_request_options_callback}
 * documentation for an extensive list of valid properties.
 * @returns {Promise<Object>} Rejects if the https protocol is not used in uri.
 * The resolved object is a brief summary of the received response
 */
module.exports = ({ request }) => (uri, options) => new Promise((resolve, reject) => {
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
        type: res.headers['content-type']
      })
    })
  })
  req.on('error', reject)
  if (typeof body === 'string') {
    // If the body string is defined, write the request body
    req.write(body)
  }
  req.end()
})
