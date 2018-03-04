import request from '../utils/request';
import { api_url } from '../constants'
export function exchangeReq() {
  const options = { method: "GET" }
  return request(api_url + '/itemV3', options)
    .then(function(data) {
      // console.log(data)
      return data
    })
}
export function get() {
  const options = { method: "GET" }
  return request(api_url + '/itemV3', options)
    .then(function(data) {
      // console.log(data)
      return data
    })
}
export function searchReq({keyword}) {
  const options = { method: "POST",body:{keyword} }
  return request(api_url + '/searchV3', options)
    .then(function(data) {
      // console.log(data)
      return data
    })
}

/*
export function create({ appName, appDes, message }) {
  const data = { name: appName, description: appDes }
  const options = { method: "POST", body: data }
  return request(protocol_and_host + '/item_create', options)
    .then(function(data) {
      return data.results
    })
}
export function save({ appName, appDes, message }) {
  const data = { name: appName, description: appDes }
  const options = { method: "POST", body: data }
  return request(protocol_and_host + '/item_create', options)
    .then(function(data) {
      return data.results
    })
}


export function deleteReq(appKey) {
  const options = { method: "DELETE" }
  return request(protocol_and_host + '/app/' + appKey, options)
    .then(function(data) {
      console.log(data.results)
      return data.results
    })
}
*/