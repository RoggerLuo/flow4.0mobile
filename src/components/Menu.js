import React from 'react';
import { connect } from 'dva'
// import { routerRedux } from 'dva/router'

const Menu = ({common,dispatch,editor}) => {
    const x = common.x
    const y = common.y
    const closeMenu = () => dispatch({type:'common/change',key:'menuVis',value:false})
    const up = () => {
        closeMenu()
        dispatch({type:'common/exchange',direction:'up',item_id:editor.item_id})
    }
    const down = () => {
        closeMenu()
        dispatch({type:'common/exchange',direction:'down',item_id:editor.item_id})
    }

    const pushDaysZero = () => {
        global.postStack.addCmd({action:'modify_timeV3',item_id:editor.item_id,days:0})
        dispatch({type:'common/pushDays',item_id:editor.item_id,days:0})
    }

    const pushDays = () => {
        closeMenu()
        
        global.postStack.addCmd({action:'modify_timeV3',item_id:editor.item_id,days:5})
        dispatch({type:'common/pushDays',item_id:editor.item_id,days:5})
    }
    const setRAM = () =>{
        if(common.route == 'RAM'){
            closeMenu()
            global.postStack.addCmd({action:'modify_timeV3',item_id:editor.item_id,days:30})
            dispatch({type:'common/pushDays',item_id:editor.item_id,days:30})
            return
        }
        closeMenu()
        
        global.postStack.addCmd({action:'modify_relationV3',item_id:editor.item_id,thread_id:1477888623})
        dispatch({type:'common/setCategory',item_id:editor.item_id,thread_id:1477888623})
        pushDaysZero()
    }
    const setTodo = () =>{
        closeMenu()
        global.postStack.addCmd({action:'modify_relationV3',item_id:editor.item_id,thread_id:1510019400})
        dispatch({type:'common/setCategory',item_id:editor.item_id,thread_id:1510019400})
    }
    const edit = () =>{
        dispatch({type:'common/edit'})
    }
    const del = () => {
        closeMenu()
        global.postStack.addCmd({action:'deleteV3',item_id:editor.item_id})
        dispatch({type:'common/deleteItem',item_id:editor.item_id})
    }
    let display = 'none'
    if(common.menuVis) display = ''
    return (
      <div style={{display:display}}>

        <div style={{position:'fixed',top:y-73,left:x-73,zIndex:'9999',
            borderRadius:'73px',height:'146px',width:'146px',backgroundColor:'#CCC',
            overflow:'hidden',lineHeight:'0',transform:'rotate(135deg)',
            userSelect:'none'
        }}>
          
          <div> 
            <div onClick={setRAM} style={{height:'73px',width:'73px',backgroundColor:'#1A2D27',display:'inline-block'}}></div>

             <div onClick={pushDays} style={{height:'73px',width:'73px',backgroundColor:'#3f8ae0',display:'inline-block'}}></div>  
          </div>

          <div>   
              <div onClick={del} style={{height:'73px',width:'73px',backgroundColor:'#FF6E97',display:'inline-block'}}></div>
              <div onClick={setTodo} style={{height:'73px',width:'73px',backgroundColor:'#5ED5D1',display:'inline-block'}}></div>
          </div>        

        </div>
        {/* 中间的圆心 */}
        <div 
            onClick={edit}
            style={{position:'fixed',top:y-33,left:x-33,zIndex:'9999',
            borderRadius:'33px',height:'66px',width:'66px',backgroundColor:'white'}}>
        </div>

        {/* 上下移动的操作 */}
        <div>
            <div onClick={up} style={{zIndex:'99',borderBottomRightRadius:'20px',borderBottomLeftRadius:'20px',height:'100px',width:'140px',backgroundColor:'#ffb323',position:'fixed',top:0,left:'50%',transform:'translate(-70px,0)'}}>
            </div>
            <div onClick={down} style={{borderTopRightRadius:'20px',borderTopLeftRadius:'20px',height:'100px',width:'140px',backgroundColor:'#ffb323',position:'fixed',bottom:0,left:'50%',transform:'translate(-70px,0)'}}>
            </div>
        </div>
      </div>
    )
}

function mapStateToProps(state) {
    return {
        common:state.common,editor:state.editor
    }
}
export default connect(mapStateToProps)(Menu)
