import {flags} from 'alto-command'

import Base from './command-base'

export default abstract class AppCommand extends Base {
  static flags: flags.Input<any> = {
    defaults: flags.boolean({description: 'use defaults for every setting'}),
    options: flags.string({description: '(yarn|typescript|eslint|mocha)'}),
    force: flags.boolean({description: 'overwrite existing files'}),
  }

  static args = [
    {name: 'path', required: false, description: 'path to project, defaults to current directory'},
  ]

  abstract type: string

  async run() {
    const {flags, args} = this.parse(AppCommand)
    const options = flags.options ? flags.options.split(',') : []

    await super.generate('app', {
      type: this.type,
      path: args.path,
      options,
      defaults: flags.defaults,
      force: flags.force,
    })
  }
}
