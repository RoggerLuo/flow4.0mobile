import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'

const Add = ({dispatch}) => {
    function click(e){
        const date_and_time = Date.parse(new Date()) / 1000
        const item_id = date_and_time.toString()
        dispatch({type:'editor/change',key:'item_id',value:item_id})
        dispatch({type:'editor/change',key:'text',value:' '})
        // global.postStack.addCmd({action:'updateTextV3',item_id,text:''})
        dispatch(routerRedux.push({pathname: '/editor'}))
    }
    return (
        <div 
            style={{textAlign:'center',lineHeight:'45px',
                position:'fixed',bottom:'80px',left:'25px',
                backgroundColor:'gold',fontSize:'26px',
                height:'46px',width:'46px',borderRadius:'23px'}} 
            onClick={click}>
            +
        </div>
    )
}            
export default connect()(Add)
