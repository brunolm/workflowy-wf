import axios from 'axios'
import { DateTime } from 'luxon'
import { config } from '../config'
import { loadSettings, saveSetting } from '../settings'

export const getInitializationData = async (ignoreCache = false) => {
  const settings = loadSettings()
  const isExpired = !settings.expireDate || DateTime.fromISO(settings.expireDate).diffNow().as('milliseconds') <= 0

  if (!ignoreCache && settings.sessionId && settings.meta && !isExpired) {
    return settings
  }

  const { data } = await axios.get(config.urls.getInitializationData, {
    headers: {
      cookie: `sessionid=${settings.sessionId}`,
    },
  })

  saveSetting({ meta: data })

  return data
}
