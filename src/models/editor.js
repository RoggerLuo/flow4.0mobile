export default {
  namespace: 'editor',
  state: {
    text: '',
    item_id: ''
  },
  reducers: {
    change(state, { key, value }) {
      const obj = {}
      obj[key] = value
      return Object.assign({}, state, obj)
    },
    updateArticle(state, { text }) {
      return Object.assign({}, state, { text })
    }
  },
  effects: {
    * refreshBugList({ appKey, hash }, { call, put }) {
      const listArr = yield call(refresh, appKey, hash)
      yield put({ type: 'loadList', listArr })
    },
    * getBugList({ appKey }, { call, put }) {
      const listArr = yield call(get, appKey)
      yield put({ type: 'loadList', listArr })
    },
    * getDropdownOptions({ appKey }, { call, put }) {
      const obj = yield call(getType, appKey)
      yield put({ type: 'loadDropdownOptions', obj })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/app-detail') {
          console.log(query.id)
          dispatch({ type: 'common/checkLogin' })
          dispatch({ type: 'getBugList', appKey: query.id })
          dispatch({ type: 'getDropdownOptions', appKey: query.id })
        }
      })
    },
  },
};
