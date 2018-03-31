const clipboardy                = require('clipboardy'),
      AddTaskToList             = require('./add_task_to_list'),
      Setup                     = require('./setup'),
      WriteListsToClipboard     = require('./write_lists_to_clipboard'),
      WriteListTasksToClipboard = require('./write_list_tasks_to_clipboard')

module.exports = class Run {

  constructor(run) {
    this.run(run)
  }

  async run(run) {

    const args      = run.args,
          first_arg = args.split(' ')[0]

    let result

    switch(first_arg) {

      case 'lists':
        result = await new WriteListsToClipboard
        break

      case 'tasks':
        result = await new WriteListTasksToClipboard({ args })
        break

      case 'setup':
        result = await new Setup
        break

      default:
        result = await new AddTaskToList({ args })

    }

    if (result.fail)
      run.reject({ title: result.fail })
    else
      run.resolve(result)

  }

}

