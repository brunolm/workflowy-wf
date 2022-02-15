import axios from 'axios'
import { v4 } from 'uuid'
import { config } from '../config'
import { loadSettings } from '../settings'

export const createList = async (listId: string, name: string) => {
  const { sessionId, meta } = loadSettings()

  const clientId = meta.projectTreeData.clientId
  const initialMostRecentOperationTransactionId =
    meta.projectTreeData.mainProjectTreeInfo.initialMostRecentOperationTransactionId

  const projectid = v4()
  const operations = [
    {
      type: 'create',
      data: {
        projectid,
        parentid: listId || config.appendListId || 'None',
        priority: 99999,
      },
    },
    {
      type: 'edit',
      data: {
        projectid,
        name,
        description: '',
      },
    },
  ]

  const payload = {
    client_id: clientId,
    client_version: 21,
    push_poll_id: (Math.random() + 1).toString(36).substring(2, 8),
    push_poll_data: JSON.stringify([
      {
        most_recent_operation_transaction_id: initialMostRecentOperationTransactionId,
        operations,
      },
    ]),
    timezone: 'America/Sao_Paulo',
    crosscheck_user_id: meta.user.id,
  }

  const formData = new URLSearchParams()
  for (const key of Object.keys(payload)) {
    formData.append(key, payload[key])
  }

  const { data } = await axios.post(config.urls.pushAndPoll, formData, {
    headers: {
      cookie: `sessionid=${sessionId}`,
    },
  })

  return data
}
