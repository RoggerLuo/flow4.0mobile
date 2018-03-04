import React from 'react'
import { connect } from 'dva'

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
const sendPost = (text,item_id) => {
    //向服务器推送指令
    const trim = (str) => str.replace(/(^\s*)|(\s*$)/g, '')
    if(trim(text)!=''){
      global.postStack.addCmd({action:'updateTextV3',item_id,text})        
    }

}
const debouncedPost = debounce(sendPost,1000)

function EditorPresentation({onChange,text}){
  return (
      <div style={{height:'100%'}}>
        <div style={{height:'65%'}}>
            <textarea
                value = {text} onChange = {onChange}
                placeholder="Write something ... " autoFocus
                style={{
                    width:'100%',height:'100%',padding:'8px', // shape size
                    outline:'none',border:'none',borderRadius: '0', //border
                    fontSize:'16px',lineHeight: '1.8', //content
                    overflowY:'auto', //others
                }}
            >
            </textarea>                
        </div>
      </div>
    )
}
function Editor({editor,dispatch}) {
  const onChange = (e) => { //逻辑放这里合适嘛，貌似合适，不然onChange这里放什么呢
      const text = e.target.value
      //更新本地的数据
      dispatch({type:'editor/updateArticle',text})
      dispatch({type:'common/updateArticleInList',text,item_id:editor.item_id})
      debouncedPost(text,editor.item_id)
  }
  return (<EditorPresentation text={editor.text} onChange={onChange}/>)
}

function mapStateToProps(state) {
    return {editor:state.editor}
}
export default connect(mapStateToProps)(Editor)
