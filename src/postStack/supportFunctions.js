import { api_url } from '../constants'
export function generateCmd(params){ // {action, item_id, text, date_and_time, days, thread_id }
  //拼出http的cmd
  if (!params.date_and_time) params.date_and_time = Date.parse(new Date()) / 1000      
  const cmd = { action:params.action, item_id:params.item_id }
  const body = params //{ text, item_id, date_and_time, days, thread_id }
  cmd.url = api_url + '/' + params.action
  cmd.options = { method: "POST", body }
  return cmd
}

export function updateStack(stack) {
  localStorage.setItem('postStack', JSON.stringify(stack))
  reduxDispatch({ type: 'common/wholeChangeStack',stack })
}

export function updateText(stack,cmd){
  const {item_id,action} = cmd
  const text = cmd.options.body.text
  //如果只是更新text，就不用添加新的action, 减少http请求
  const isJustUpdateText = stack.some((el, ind) => {
    if ((el.item_id == item_id) && (el.action == action)) {
      stack[ind].options.body.text = text
      return true
    }
  })
  if (!isJustUpdateText) stack.push(cmd)
}
