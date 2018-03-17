clipboard          = require('electron').clipboard
output             = ''
original_clipboard = clipboard.readText()

const
  path  = require('path'),
  spawn = require('child_process').spawn,
  log   = path.join(process.env.HOME, 'Library', 'Logs', 'ClipTrigger', 'log.log'),
  tail  = spawn('tail', ['-n', '0', '-f', log])

tail.stdout.on('data', data => output += data)

wait_for_success = str => new Promise((resolve, _reject) => {

  clipboard.writeText(str)

  const check = () => {
    if(/success/.test(output)) {
      output = ''
      resolve()
    } else {
      setTimeout(check)
    }
  }

  check()

})

clear_clipboard = () => new Promise((resolve, _reject) => {
  clipboard.writeText('')
  setTimeout(resolve, 350)
})

ensure_clip_trigger_is_running = () => new Promise((resolve, reject) => {

  const success = () => {
    clearTimeout(timeout_id)
    resolve()
  }

  const fail = () => {
    console.log('Please ensure Clip Trigger is running before running tests.')
    process.exit(1)
  }

  const timeout_id = setTimeout(fail, 500)

  wait_for_success('ct ?').then(success)

})

restore_clipboard = () => clipboard.writeText(original_clipboard)

after(restore_clipboard)
