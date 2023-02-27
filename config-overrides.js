/* by react-app-rewired */

const webpack = require('webpack')

module.exports = function override (config, env) {
  // --- add Buffer in webpack config for solve: ReferenceError: Buffer is not defined (in TonWeb)
  const fallback = config.resolve.fallback || {}
  fallback.buffer = require.resolve('buffer/')
  config.resolve.fallback = fallback
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  )
  // ---

  return config
}
