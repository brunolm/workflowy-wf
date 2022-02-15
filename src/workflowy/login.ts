import axios from 'axios'
import { DateTime } from 'luxon'
import { config } from '../config'
import { loadSettings, saveSetting } from '../settings'

interface LoginInfo {
  user?: string
  pass?: string
  ignoreCache?: boolean
}

export const login = async (loginInfo: LoginInfo) => {
  const settings = loadSettings()

  const isExpired = !settings.expireDate || DateTime.fromISO(settings.expireDate).diffNow().as('milliseconds') <= 0

  if (!loginInfo.ignoreCache && settings.sessionId && !isExpired) {
    return settings
  }

  const formData = new URLSearchParams()
  formData.append('username', loginInfo.user || config.username)
  formData.append('password', loginInfo.pass || config.password)

  const response = await axios.post(config.urls.login, formData)

  // sessionid=xxxxxxxxxx; expires=Tue, 11 Aug 2022 21:11:11 GMT; HttpOnly; Max-Age=15724800; Path=/; SameSite=None; Secure
  const cookie = response.headers?.['set-cookie']?.[0]

  const groups = cookie.match(/sessionid=(?<sessionId>\w+);\s*expires=(?<expires>[^;]+);/i)?.groups

  const sessionId = groups?.sessionId
  const expires = groups?.expires

  const expireDate = DateTime.fromHTTP(expires)

  const props = {
    sessionId,
    expireDate: expireDate.toISO(),
  }
  saveSetting(props)

  return {
    ...settings,
    ...props,
  }
}
