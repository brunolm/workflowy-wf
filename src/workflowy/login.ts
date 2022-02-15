import axios from 'axios'
import { config } from '../config'

export const login = async () => {
  const formData = new URLSearchParams()
  formData.append('username', config.username)
  formData.append('password', config.password)

  const response = await axios.post(config.urls.login, formData)

  // sessionid=xxxxxxxxxx; expires=Tue, 16 Aug 2022 21:11:41 GMT; HttpOnly; Max-Age=15724800; Path=/; SameSite=None; Secure
  const cookie = response.headers?.['set-cookie']?.[0]

  const sessionId = cookie.match(/sessionid=(?<sessionId>\w+);/i)?.groups?.['sessionId']

  return sessionId
}
