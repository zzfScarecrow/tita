import Immutable from 'seamless-immutable'
import {
  Types as ReduxSauceTypes,
  createReducer,
  createTypes
} from 'reduxsauce'

export const <$=tplName$>ReducerTypes = createTypes(
  `
  MERGE_DATA
  SET_IN
  REMOVE
`,
  {
    prefix: 'EXAMPLE_'
  }
)

const INITIAL_STATE = Immutable({
  data: {},
  list: {}
})

export const defaultHandler = (state = INITIAL_STATE, action) => {
  return state
}

export const mergeData = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return state.setIn(['data', payload.status], payload.data)
}

export const setIn = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const { path, value } = payload
  return state.setIn(path, value)
}

export const remove = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const { path, status } = payload
  const prev = state.getIn(path)
  let next = prev
  if (Array.isArray(prev)) {
    let arr = prev.asMutable()
    arr.splice(status, 1)
    next = arr
  } else {
    next = prev.without(status)
  }
  return state.setIn(path, next)
}

export const HANDLERS = {
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
  [<$=tplName$>ReducerTypes.MERGE_DATA]: mergeData,
  [<$=tplName$>ReducerTypes.SET_IN]: setIn,
  [<$=tplName$>ReducerTypes.REMOVE]: remove
}

export default createReducer(INITIAL_STATE, HANDLERS)
