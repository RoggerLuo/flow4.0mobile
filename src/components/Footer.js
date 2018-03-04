import React from 'react';
import { connect } from 'dva';

function IndexPage({dispatch,common}) {
  const route = (value) => {
      dispatch({type:'common/change',key:'route',value})    
  }
  const baiscStyle = (flag) =>{
      if(flag){
        return {width:'25%',textAlign:'center',backgroundColor:'white'}
      }else{
        return {width:'25%',textAlign:'center'}
      }
   }
  const configData = [
    {title:'To do',route:'todo',isSelected:common.route=='todo'},
    {title:'RAM',route:'RAM',isSelected:common.route=='RAM'},
    {title:'temp',route:'Repo',isSelected:common.route=='Repo'},
    {title:'Rearch',route:'search',isSelected:common.route=='search'},
  ]
  /*
  display:'flex',justifyContent:'space-between',
  */
  return (
    <div style={{width:'100%',height:'50px',display:'flex',position:'fixed',bottom:'0',backgroundColor:'gold'}}>
    <div style={{
        width:'100%',
        lineHeight:'50px',
        display:'flex',fontFamily: 'sans-serif'
    }}>
        {configData.map((el,ind)=>{
          return (<div onClick={()=>{route(el.route)}} style={baiscStyle(el.isSelected)} key={ind}>
             {el.title}
            </div>
            )
        })}
      
      </div>
    </div>
  );
}
function mapStateToProps(state) {
    return {
        common:state.common,editor:state.editor
    }
}

export default connect(mapStateToProps)(IndexPage);
