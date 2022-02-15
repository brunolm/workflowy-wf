import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
  username: process.env.WORKFLOWY_USER,
  password: process.env.WORKFLOWY_PASS,
  appendListId: process.env.WORKFLOWY_APPEND_LIST_ID,

  urls: {
    base: 'https://workflowy.com',
    login: 'https://workflowy.com/ajax_login',
    getInitializationData: 'https://workflowy.com/get_initialization_data',
    pushAndPoll: 'https://workflowy.com/push_and_poll',
  },
}
