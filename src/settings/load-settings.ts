import * as fs from 'fs'
import { filePath } from './_file-path'

export const loadSettings = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '{}')
  }

  const settings = JSON.parse(fs.readFileSync(filePath).toString())

  return settings
}
