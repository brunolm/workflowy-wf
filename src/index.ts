import { inspect } from 'util'
import { getInitializationData, login } from './workflowy'

const start = async () => {
  const sessionId = await login()

  const data = await getInitializationData(sessionId)

  console.log(inspect(data.projectTreeData.mainProjectTreeInfo.rootProjectChildren, false, 10, true))
}

start()
