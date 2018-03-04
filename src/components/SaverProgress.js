import React from 'react';
import { connect } from 'dva';
import s from './saver.css';

const ArticleItemPres = ({common, dispatch}) => {
    const length = common.postStack.length
    const height = length == 0 ?'0px':'45px'
    return (
        <div 
            className={s.slowing} 
            style={{
                right:'20px',top:'20px',position:'fixed',
                width:height,height:height,
                backgroundColor:'gold',overflow:'hidden'}}
        >
            <h2 style={{fontSize:'16px',fontWeight:'400',lineHeight:'20px',textAlign:'center'}}>
                {length}
            </h2>
        </div>
    )
}

function mapStateToProps(state) {
    return { common:state.common }
}
export default connect(mapStateToProps)(ArticleItemPres)
