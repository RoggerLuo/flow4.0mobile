import React from 'react'
import { connect } from 'dva'

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, '');
}
class Searchbox extends React.Component {
    constructor(props) {
        super(props);
        this.onchange = debounce(this.onchange,1000);
        this.onchange = this.onchange.bind(this)
    }
    onchange(e){
        const value = trim(this.refs.search.value)
        if(value=='') return 
        this.props.dispatch({type:'common/search',keyword:value})
        console.log(value)
    }
    render() {
        return (<div style={{width:'100%',overflowX:'hidden'}}>
            <input 
                ref="search" 
                onInput={this.onchange} 
                type="text" 
                placeholder="put some words here"
                style={{width:'100%',height:'40px',lineHeight:'40px',
                    fontSize:'16px',outline:'none',border: 'none',
                    padding:'0 10px'}} />
        </div>)
    }
}
export default connect()(Searchbox)
