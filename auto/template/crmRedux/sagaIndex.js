import <$=tplName$>Saga from './<$=tplName$>'

const genRoot = sagas => {
  let sagaArr = []
  Object.keys(sagas).forEach(sagasKey => {
    let item = sagas[sagasKey]
    Object.keys(item).forEach(key => {
      sagaArr.push(item[key]())
    })
  })
  return sagaArr
}

export default function* rootSaga() {
  yield genRoot({ <$=tplName$>Saga })
}
