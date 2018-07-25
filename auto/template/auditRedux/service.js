import <$=tplName$> from 'api/modules/<$=tplName$>'
import request from 'utils/request'

export async function getData(payload) {
  const { status, params } = payload
  return request({ url: <$=tplName$>[status], method: 'get', data: params })
}

export async function postData(payload) {
  const { status, params } = payload
  return request({ url: <$=tplName$>[status], method: 'post', data: params })
}

export async function create(payload) {
  return request({ url: createEntry, method: 'post', data: payload })
}

export async function update(payload) {
  return request({ url: updateEntry, method: 'post', data: payload })
}
