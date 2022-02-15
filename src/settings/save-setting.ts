import * as fs from 'fs'
import { filePath } from './_file-path'

export const saveSetting = (props) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '{}')
  }

  const settings = JSON.parse(fs.readFileSync(filePath).toString())

  fs.writeFileSync(
    filePath,
    JSON.stringify({
      ...settings,
      ...props,
    }),
  )
}
