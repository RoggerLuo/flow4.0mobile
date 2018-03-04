import React from 'react'
import { connect } from 'dva'
import s from './IndexPage.css'
import Footer from '../components/Footer'
import Article from '../components/Article'
import Menu from '../components/Menu'
import '../utils/dateFormatter'
import SaverProgress from '../components/SaverProgress'
import Add from '../components/Add'
import Router from './Router'

function IndexPage({dispatch,common}) {
    return (
        <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
            <div style={{marginBottom:'40px',userSelect:'none'}}>
                <SaverProgress />
                <Router />
            </div>
            <Footer></Footer>
            <Menu />
            <Add />
        </div>
    )
}

function mapStateToProps(state) {
    return {common:state.common}
}

export default connect(mapStateToProps)(IndexPage)
