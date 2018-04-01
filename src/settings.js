const fs = require('fs')

module.exports = class Settings {

  constructor() {
    this.assign_default_settings()
    this.assign_environment_settings()
    this.assign_user_settings()
  }

  assign_default_settings() {
    Object.assign(this, require('../config/default'))
  }

  assign_environment_settings() {
    const env_config = `${__dirname}/../config/${process.env.CT_ENV}.js`

    if (fs.existsSync(env_config))
      Object.assign(this, require(env_config))
  }

  assign_user_settings() {
    this.create_settings_file_if_nonexistant()
    const user_settings = JSON.parse(fs.readFileSync(this.settings_path))
    Object.assign(this, user_settings)
  }

  get settings_path() {
    return this.settings_dir + this.settings_file
  }

  create_settings_file_if_nonexistant() {

    if (fs.existsSync(this.settings_path))
      return

    if (!fs.existsSync(this.settings_dir))
      fs.mkdirSync(this.settings_dir)

    if (!fs.existsSync(this.settings_path))
      fs.writeFileSync(this.settings_path, '{}\n')

  }

}
