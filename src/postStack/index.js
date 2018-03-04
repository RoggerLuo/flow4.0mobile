import request from '../utils/request';
import { generateCmd, updateStack, updateText } from './supportFunctions'
export class PostStack {
  constructor() {
    this.check = this.check.bind(this)
    this.cmdExec = this.cmdExec.bind(this)
    this.addCmd = this.addCmd.bind(this)
    this.isHttping = false

    const stack = JSON.parse(localStorage.getItem('postStack'))
    this.stack = stack || []
    updateStack(this.stack)

    setInterval(this.check, 5000)
  }
  cmdExec() {
    const that = this
    const cmd = this.stack.pop()
    that.isHttping = true
    request(cmd.url, cmd.options).then(function(data) {
      that.isHttping = false
      if (data.err) {
        console.log('http failed, keep on checking ...')
        console.log(data)
        that.stack.push(cmd)
        return
      }
      updateStack(that.stack)
      that.check()
    })
  }
  check() {
    if (this.stack.length == 0) return
    if (this.isHttping) return
    this.cmdExec()
  }
  addCmd(params) { //{ action, item_id, text, date_and_time, days, thread_id }
    const cmd = generateCmd(params)
    if (cmd.action == 'updateTextV3') {
      updateText(this.stack, cmd)
    } else {
      this.stack.push(cmd)
    }
    updateStack(this.stack)
  }
}
