import React from 'react'
import { connect } from 'dva'
import s from './common.css'
const ArticleItemPres = ({common,editor,item_id,id,content,date_and_time,thread_id, dispatch}) => {
    const time = new Date(date_and_time*1000).Format("yyyy-MM-dd hh:mm:ss")
    let color = '#949494'
    if(date_and_time*1000 > Date.parse(new Date())){
        color = '#ef7d00'
    }
    function click(e){
        if(common.route == 'search') return
        dispatch({type:'editor/change',key:'text',value:content})
        dispatch({type:'editor/change',key:'item_id',value:item_id})

        dispatch({type:'common/change',key:'x',value:e.clientX})
        dispatch({type:'common/change',key:'y',value:e.clientY})
        dispatch({type:'common/toggleMenu'})//,key:'menuVis',value:!common.menuVis
        dispatch({type:'common/closeMenuAfter1sec'})//,key:'menuVis',value:!common.menuVis

    }
    let saved = ''
    let backgroundColor = 'white'
    if((editor.item_id == item_id)&&common.menuVis ){

        backgroundColor = 'rgb(229, 247, 255)'
    }
    //            className={s.userselect}
//borderBottom:'20px solid #CCC'
    return (<div style={{backgroundColor,padding:'20px 10px',marginBottom:'10px'}} onClick={click} className={s.userselect}>
        <div 
            style={{fontSize:'16px',fontWeight:'400',lineHeight:'1.8'}} 
            dangerouslySetInnerHTML={{__html: content.replace(/\n/g, "<br />")}}>
        </div>
        <div>
            <span style={{color,fontSize:'13px',userSelect:'none'}}>{time}</span>
        </div>
      </div>
    )
}
//<span>&nbsp;/{thread_id}</span>    

function mapStateToProps(state) {
    return {
        common:state.common,editor:state.editor
    }
}
export default connect(mapStateToProps)(ArticleItemPres)
//11 10 9 8