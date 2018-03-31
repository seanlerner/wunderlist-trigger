module.exports = () => {
  return {
    files: [
      'main.js',
      'config/*.js',
      'src/*.js'
    ],
    tests: [
      'test/*.js',
      'test/*.json',
      'test/mocks/*.js',
      'test/mocks/*.json'
    ],
    env: {
      type: 'node',
      params: {
        env: 'CT_ENV=test'
      }
    },
    debug: true
  }
}
