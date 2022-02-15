import axios from 'axios'
import { config } from '../config'

export const getInitializationData = async (sessionId: string) => {
  const { data } = await axios.get(config.urls.getInitializationData, {
    headers: {
      cookie: `sessionid=${sessionId}`,
    },
  })

  return data
}
