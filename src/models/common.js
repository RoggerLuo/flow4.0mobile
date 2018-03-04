import { create, get,searchReq, deleteReq } from '../services/common'
import { toJS, fromJS, List, Map } from 'immutable'
import switcher from '../routes/listSwitcher'
import { routerRedux } from 'dva/router'

const delay = timeout => new Promise(resolve => setTimeout(resolve,timeout))

export default {
    namespace: 'common',
    state: {
        list: [],
        modalVisible: false,
        appKeyModalVisible:false,
        appKey:'',
        isLoading: false,
        showSuccessWord:false,

        route:'todo',

        x:'0',
        y:'0',
        menuVis:false,

        postStack:[],
        tempExecCount:0,
        tempStackLength:0
    },
    reducers: {
        toggleMenu(state){
            return Object.assign({}, state, {menuVis:!state.menuVis})
        },
        wholeChangeStack(state,{stack}){
            //只是替换什么都不做
            return Object.assign({}, state, {postStack:stack})
        },
        updateArticleInList(state,{text,item_id}){
            const data = fromJS(state)
            const ind = fromJS(state.list).findKey((el, index, iter) => el.get('item_id') == item_id)
            if(!ind){ //没有就创建
                const newObj = fromJS({content:text,item_id,date_and_time:item_id,thread_id:0})
                const newData = data.updateIn(['list'], 'initial', (el) => el.push(newObj)  ).toJS()
                return newData
            }
            return data.updateIn(['list',ind], [], (el) => el.set('content',text)).toJS()  
        },
        change(state,{key,value}){
            const obj = {}
            obj[key] = value
            return Object.assign({}, state, obj)
        },
        
        deleteItem(state,{item_id}){
            const data = fromJS(state)
            const ind = fromJS(state.list).findKey((el, index, diter) => el.get('item_id') == item_id)
            return data.updateIn(['list'], [], (el) => el.delete(ind) ).toJS()  
        },
        pushDays(state,{item_id,days}){
            const data = fromJS(state)
            const ind = fromJS(state.list).findKey((el, index, diter) => el.get('item_id') == item_id)
            return data.updateIn(['list',ind], [], (el) => el.set('date_and_time',Date.parse(new Date()) / 1000 + 60*60*24*days) ).toJS()  
        },
        setCategory(state,{item_id,thread_id}){
            const data = fromJS(state)
            const ind = fromJS(state.list).findKey((el, index, diter) => el.get('item_id') == item_id)
            return data.updateIn(['list',ind], [], (el) => el.set('thread_id',thread_id) ).toJS()  
        },
        date_and_timeExchange(state,{ind1,ind2,time1,time2}){
            const data = fromJS(state)
            return data.
                updateIn(['list',ind1], [], (el) => el.set('date_and_time',time2)).
                updateIn(['list',ind2], [], (el) => el.set('date_and_time',time1)).toJS()
        }
    },
    effects: { 
        *closeMenuAfter1sec({},{call,put,select}){
            const prevTime = Date.parse(new Date())
            yield put({type:'change',key:'menuCloseDelayCountTime',value:prevTime})//锁上
            yield call(delay,1500)
            const menuCloseDelayCountTime = yield select(state => state.common.menuCloseDelayCountTime)
            if(menuCloseDelayCountTime == prevTime){ //如果还没变，则说明没有插入
                yield put({type:'change',key:'menuVis',value:false})                
            }
        },
        * edit({},{ call, put }){
            yield put({type:'change',key:'menuVis',value:false})
            yield call(delay,100)
            yield put(routerRedux.push({pathname: '/editor'}))
        },
        * exchange({direction}, { call, put, select }) {
            //不能放在reducer里面是因为 reducer不能dispatch reduce
            const common = yield select(state =>state.common)
            const item_id = yield select(state =>state.editor.item_id)
            const currentList = yield select(state => switcher(state.common.list.slice(0),state.common.route))
            
            /*
                //逻辑上的前后关系是存在filter过的list里面】
                //找到并确定 两个item_id
            */
            let index = 0
            currentList.some((el,ind)=>{
                if(item_id == el.item_id){
                    index = ind
                    return true
                }
            })
            //确定 a b ，两个要替换的item_id
            let a 
            if(direction=='up'){
                a = currentList[index - 1].item_id
            }else{
                a = currentList[index + 1].item_id
            }
            if(a === undefined) return
            // b 是当前article
            const b = item_id


            /*
                根据 item_id 找到 time1和time2
            */
            const originalList = common.list
            let time1,ind1,ind2,time2
            originalList.some((el,ind)=>{
                if(el.item_id == a){
                    time1 = el.date_and_time
                    ind1 = ind
                    return true
                }
            })
            originalList.some((el,ind)=>{
                if(el.item_id == b){
                    ind2 = ind
                    time2 = el.date_and_time
                    return true
                }
            })
            global.postStack.addCmd({action:'exchangeV3',a,b,a_time:time2,b_time:time1})                
            yield put({type:'date_and_timeExchange',ind1,ind2,time1,time2})            
        },
        * search({keyword}, { call, put }) {
            const list = yield call(searchReq,{keyword})
            /*  刷新列表 */
            yield put({type:'change',key:'searchList',value:list})
        },
        * getAppList({}, { call, put, select }) {
            const isGetListAlready = yield select(state =>state.common.isGetListAlready)
            if(isGetListAlready) return
            const listArr = yield call(get)
            // listArr.reverse()
            console.log('Get the list through http ...')
            yield put({ type: 'change', key:'list',value:listArr })
            yield put({ type: 'change', key:'isGetListAlready',value:true })
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname,query }) => {
                if (pathname === '/') {
                    dispatch({type:'getAppList'})
                }
            })
        },
    }
}
