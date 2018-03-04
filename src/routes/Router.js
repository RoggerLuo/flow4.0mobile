import React from 'react'
import { connect } from 'dva'
import Article from '../components/Article'
import switcher from './listSwitcher'
import SearchBox from './Searchbox'
import s from './common.css'

function ErrorCatcher({list}){
    const errText = list.err.toString()
    return (<h2 style={{padding:'10px'}}>{errText}</h2>)
}

function Search({list}){
    list = list || []
    return (
        <div style={{backgroundColor:'#f5f5f5'}}>
            <SearchBox/>
            {list.map((el,ind)=>(<Article  key={ind} {...el}/>))}
            <div className={s.gradient} style={{width:'100%',height:'50px'}}></div>
        </div>
    )
}

function Lists({list,route}){
    const data = switcher(list.slice(0),route)
    return (
        <div style={{backgroundColor:'#f5f5f5'}}>
            {data.map((el,ind)=><Article key={ind} {...el}/>)}
            <div className={s.gradient} style={{width:'100%',height:'50px'}}></div>
        </div>
    )

}
function Router({dispatch,common}) {
    //捕捉错误信息
    if(common.list.err) return (<ErrorCatcher list={common.list}/>)
    //search        
    if(common.route=='search') return (<Search list={common.searchList}/>)
    //normal
    return (<Lists list={common.list} route={common.route} />)
}

function mapStateToProps(state) {
    return {common:state.common}
}
export default connect(mapStateToProps)(Router)
