export default {
  multipass: true,
  floatPrecision: 2,
  plugins: [
    'preset-default',
    { name: 'removeDimensions', active: true },
    { name: 'removeViewBox', active: false },
    { name: 'convertPathData', params: { floatPrecision: 2 } },
    { name: 'cleanupNumericValues', params: { floatPrecision: 2 } }
  ]
}
