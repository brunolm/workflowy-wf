import * as fs from 'fs'
import * as path from 'path'

export const logger = (...args) => {
  fs.appendFileSync(path.join('C:\\BrunoLM\\Projects\\flowlauncher\\wf', 'output.txt'), args.join(' ') + '\n')
}
