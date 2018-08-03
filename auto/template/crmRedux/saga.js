import { call, put, take, select, fork, delay } from 'redux-saga/effects'
import { <$=tplName$>ReducerTypes as reducerTypes } from '../reducers/<$=tplName$>'
import { createTypes } from 'reduxsauce'
import { create, update, getData, postData } from '../service'

export const sagaTypes = createTypes(
  `
  INIT
  QUERY_DATA
  QUERY_LIST_DATA
  CLEAR
  `,
  { prefix: 'EXAMPLE_SAGA_' }
)

function* fetchData(payload) {
  const data = yield call(getData, payload)
  yield put({
    type: reducerTypes.MERGE_DATA,
    payload: {
      ...payload,
      data: data.data
    }
  })
  if (payload.params.type === 'page') {
    let page = data.data.curpage || data.data.page
    const pageNum = parseInt(page)
    const perpageNum = parseInt(data.data.perpage)
    const totalNum = parseInt(data.data.total)
    const pagination = {
      perpage: perpageNum,
      pageSize: perpageNum,
      page: pageNum,
      current: pageNum,
      total: totalNum
    }
    yield put({
      type: reducerTypes.SET_IN,
      payload: {
        path: ['list', payload.status, 'pagination'],
        value: pagination
      }
    })
  }
}

export function* queryData() {
  while (true) {
    const action = yield take(sagaTypes.QUERY_DATA)
    const { payload } = action
    yield fork(fetchData, payload)
  }
}

export function* queryListData() {
  while (true) {
    const action = yield take(sagaTypes.QUERY_LIST_DATA)
    const { payload } = action
    const state = yield select()
    let { status, filterParams, pagination } = payload
    let defaultFilterParams = {}
    let params = {}
    let defaultPagination = {
      perpage: 10,
      pageSize: 10,
      curpage: 1,
      current: 1,
      total: 0
    }
    if (state.<$=tplName$>.list[status]) {
      defaultFilterParams = state.<$=tplName$>.list[status].filterParams
    }
    if (pagination && pagination.pageSize) {
      pagination.perpage = pagination.pageSize
    }
    if (pagination && pagination.current) {
      pagination.curpage = pagination.current
    }
    filterParams = {
      ...defaultFilterParams,
      ...filterParams
    }
    pagination = {
      ...defaultPagination,
      ...pagination
    }
    params = {
      ...filterParams,
      ...pagination,
      type: 'page'
    }
    yield put({
      type: reducerTypes.SET_IN,
      payload: { path: ['list', status, 'filterParams'], value: filterParams }
    })
    yield fork(fetchData, {
      status: payload.status,
      params
    })
  }
}

export function* init() {
  while (true) {
    yield take(sagaTypes.INIT)
    yield put({
      type: sagaTypes.QUERY_LIST_DATA,
      payload: {
        status: 'foo',
        filterParams: { baz: 'baz' }
      }
    })
    yield put({
      type: sagaTypes.QUERY_LIST_DATA,
      payload: {
        status: 'bar',
        filterParams: { baz: 'baz' }
      }
    })
    yield take(sagaTypes.CLEAR)
  }
}

export default {
  queryData,
  queryListData,
  init
}
