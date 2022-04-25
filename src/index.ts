import { loadSettings } from './settings'
import { createList, getInitializationData, login } from './workflowy'

const parsed = JSON.parse(process.argv[2])
const { method, parameters } = parsed

const start = async () => {
  const settings = loadSettings()

  if (method === 'query') {
    const saveNoteAction = settings.sessionId
      ? {
          Title: 'Workflowy: Save note',
          Subtitle: `${method} ${parameters}`,
          JsonRPCAction: {
            method: 'saveNote',
            parameters,
          },
          IcoPath: 'Images\\app.png',
          Score: 100,
        }
      : undefined

    const [userParam, passParam] = [
      `${parameters?.[0].split(/ /g).slice(0, 1)}`,
      `${parameters?.[0].split(/ /g).slice(1)}`,
    ]
    const loginAction = {
      Title: 'Workflowy: Login',
      Subtitle: `email: ${parameters?.[0].split(/ /g).slice(0, 1)} password: ${parameters?.[0].split(/ /g).slice(1)}`,
      JsonRPCAction: {
        method: 'login',
        parameters: [userParam, passParam],
      },
      IcoPath: 'Images\\app.png',
      Score: 0,
    }

    console.log(
      JSON.stringify({
        result: [saveNoteAction, loginAction].filter(Boolean),
      }),
    )

    return
  }

  if (method === 'login') {
    const [user, pass] = parameters

    await login({ user, pass, ignoreCache: true })
    await getInitializationData()

    return
  }

  if (method === 'saveNote') {
    await createList('None', parameters[0])
  }
}

start()
