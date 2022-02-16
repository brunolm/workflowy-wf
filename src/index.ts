import { program } from 'commander'
import { createList, getInitializationData, login } from './workflowy'

const start = async () => {
  program
    .command('login')
    .option('-u, --user <user>')
    .option('-p, --pass <pass>')
    .option('--ignore-cache')
    .action(async (p) => {
      await login(p)
      await getInitializationData()

      console.log('Logged in')
    })

  program
    .command('add')
    .option('-u, --user <user>')
    .option('-p, --pass <pass>')
    .option('-l, --list <list>')
    .option('-n, --name <name>', 'Content of the item')
    .action(async (p) => {
      await login(p)
      await getInitializationData()

      await createList(p.list, p.name)

      console.log('Created')
    })

  program.parse(process.argv)
}

start()
