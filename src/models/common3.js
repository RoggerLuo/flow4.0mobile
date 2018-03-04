import { create, get, deleteReq } from '../services/common'
import { toJS, fromJS, List, Map } from 'immutable'

export default {
    namespace: 'common3',
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

        postStack:[]
    },
    reducers: {
        onEdit(state,{text,item_id}){
            const data = fromJS(state)
            const ind = fromJS(state.list).findKey((el, index, iter) => el.get('item_id') == item_id)
            return data.updateIn(['list',ind], [], (el) => el.set('content',text)).toJS()  
        },
        change(state,{key,value}){
            const obj = {}
            obj[key] = value
            return Object.assign({}, state, obj)
        },
        loadList(state,{listArr}){
            return Object.assign({}, state, {
                list: listArr
            })
        },
        openAppKeyModal(state,{appKey,showSuccessWord}) {
            return Object.assign({}, state, {
                appKeyModalVisible: true,
                appKey,
                showSuccessWord
            })
        },
        closeAppKeyModal(state) {
            return Object.assign({}, state, {
                appKeyModalVisible: false
            })
        },
        openModal(state) {
            return Object.assign({}, state, {
                modalVisible: true
            })
        },
        closeModal(state) {
            return Object.assign({}, state, {
                modalVisible: false
            })
        },
        loading(state) {
            return Object.assign({}, state, {
                isLoading: true
            })

        },
        stopLoading(state) {
            return Object.assign({}, state, {
                isLoading: false
            })
        }
    },
    effects: { 
        * deleteApp({appKey}, { call, put }) {
            const listArr = yield call(deleteReq,appKey)
            /*  刷新列表 */
            yield put({ type: 'getAppList' })
        },
        * createApp({ payload }, { call, put }) {
            const res = yield call(create, payload)
            yield put({ type: 'closeModal' })
            yield put({ type: 'stopLoading' })
            /* 弹出modal appKey 成功 */
            yield put({ type: 'openAppKeyModal', showSuccessWord:true, appKey:res.appKey})
            /*  刷新列表 */
            yield put({ type: 'getAppList' })
        },
        * getAppList({}, { call, put, select }) {
            const isGetListAlready = yield select(state =>state.list.isGetListAlready)
            if(isGetListAlready) return

            const listArr = yield call(get)
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
