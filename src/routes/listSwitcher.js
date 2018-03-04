export default function (list,route) {
    switch(route){
        case 'todo':
            return list
                .filter(el=>(el.thread_id=='1510019400')||( el.thread_id==0) )
                .sort((a,b)=> - (a.date_and_time - b.date_and_time))
        case 'RAM':
            return list.filter(el=>el.thread_id=='1477888623').sort((a,b)=> (a.date_and_time - b.date_and_time))
        case 'Repo':
            return list.filter(el=>(el.thread_id!='1477888623')&&(el.thread_id!='1510019400')).reverse()
    }
    return list 
}
