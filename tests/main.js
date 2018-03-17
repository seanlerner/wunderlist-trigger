before(async () => {
  await clear_clipboard()
  await ensure_clip_trigger_is_running()
  await wait_for_success('ct reload wunderlist')
})

describe('main.js', () => {

  it('reset', async () => {
    await wait_for_success('wl reset')
  })

  it('setup', async () => {
    await wait_for_success('wl setup')
  })

  it('add item to inbox', async () => {
    await wait_for_success('wl buy bananas')
  })

  it('add item to custom list', async () => {
    await wait_for_success('wl movie new movie to watch')
  })

})
