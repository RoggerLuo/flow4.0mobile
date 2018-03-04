import fetch from 'dva/fetch';
import qs from 'qs'

function parseJSON(response) {
    if(!response.json){
        return response
    } 
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    let optionsCloned 
    if (options.method == "POST") {
        // 这里改变改变了引用变量，可能造成不可预测的影响
        optionsCloned = Object.assign({},options,{body:qs.stringify(options.body)})
        optionsCloned.headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
    }
    // options.credentials = 'include' //带上cookies
    return fetch(url, optionsCloned)
        .then(checkStatus)        
        .then(parseJSON)
        // .then(data => ({ data }))
        .catch(err => {
            return ({ err })
        });
}
