const cl = console.log;

const  onStatus = document.getElementById("status");
const todo = document.getElementById("todo");

const TODO_URL =`https://jsonplaceholder.typicode.com/todos`

let todoArr =[]

const templating = (arr)=>{
    let result = ``;
    let completed ='';
    arr.forEach((todo, i)=>{
        (todo.completed=== true)? completed ="Yes" :completed="No"
        result+=`
                <tr>
                    <td>${i+1}</td>
                    <td>${todo.userId}</td>
                    <td>${todo.title}</td>
                    <td>${completed}</td>
                </tr>
        `
    })
    cl(result);
    todo.innerHTML = result;
}



const todoObj = (obj)=>{
    for(const key in obj){
        todoArr.push({...obj[key]})
    }
    return todoArr
}


const makeApiCall = async (methodName, apiurl, msgbody)=>{
    msgbody = msgbody ? JSON.stringify(msgbody):null;

    let res = await fetch(apiurl, {
        method:methodName,
        body:msgbody,
        headers:{
            token : `get aJWT Token From Local Storage`
        }

    })
    return res.json()
}

const fetchTodo = async()=>{
    let data = await makeApiCall("GET", TODO_URL);
    let array = todoObj(data)
    cl(array)
    templating(array)
}

fetchTodo()


const onStatusChange = (eve) =>{
    let getClassName = eve.target.value;
    cl(getClassName);
    if(getClassName ==="all"){
        templating(todoArr)
    }else if(getClassName ==="completed"){
        filtervalue = todoArr.filter(ele => ele.completed);
        templating(filtervalue)
    }else{
        filtervalue = todoArr.filter(ele => ele.completed === false);
        templating(filtervalue)
    }
}


onStatus.addEventListener("change", onStatusChange)