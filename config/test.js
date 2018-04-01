module.exports = {
  client_secret:                   process.env.WUNDERLIST_TEST_CLIENT_SECRET,
  clip_trigger_email:              process.env.CLIP_TRIGGER_TEST_ACCOUNT_EMAIL,
  clip_trigger_test_account_token: process.env.CLIP_TRIGGER_TEST_ACCOUNT_TOKEN,
  clip_trigger_settings_file:      `${__dirname}/../test-settings/clip-trigger-settings.json`,
  settings_dir:                    `${__dirname}/../test-settings/`,
  settings_file:                   'wunderlist-trigger.json'
}
