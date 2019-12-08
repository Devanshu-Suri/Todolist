import React, { Component } from 'react';
import './todolist.css';
import 'bulma/css/bulma.css'

export class Todolist extends Component {
constructor(){
super();
this.state={
tasks: [],
doneTasks: [],
modalTaskForm: false,
modalTaskForm_Toggle: '',

tittle: '',
detail: '',
time: '',
fav: false,

act: 0,
index: 0,
renderTasks: 1,
navActive: 'tasks'
}
}

// make uniq id for every task
uniqueId=()=>{
return 'id-' + Math.random().toString(36).substr(2, 16);
};

//   TASKS
modalTaskForm=(modal)=>{
if(modal){
this.setState({modalTaskForm_Toggle: 'is-active', modalTaskForm: modal});
}else{
this.setState({modalTaskForm_Toggle: '', modalTaskForm: modal});
}
}

submitTask=(e)=>{
e.preventDefault();//for stop the reload when we submit the form
// console.log('submit');
let {tasks, tittle, detail, time, act, index} = this.state;

if(act === 0){              //NEW Data
let task = {
tittle, detail, time, id: this.uniqueId()
};
tasks.push(task);
}else{                      //UPDATE the data at equal index
tasks[index].tittle = tittle;
tasks[index].detail = detail;
tasks[index].time = time;
} 

this.setState({
tasks,
modalTaskForm_Toggle: '', 
modalTaskForm: false,
// reset the value of form
tittle: '',
detail: '',
time: '',
fav: false,
act: 0
});

}

inputChange=(e)=>{
let {name, value} = e.target;
this.setState({
[name]: value
});
}

fRemove = (i) => {
let { tasks } = this.state;
tasks.splice(i,1);
this.setState({
tasks,
// reset
tittle: '',
detail: '',
time: '',
fav: false
});

}

fEdit = (i) => {
let task = this.state.tasks[i];

this.setState({
tittle: task.tittle,
detail: task.detail,
time: task.time,

modalTaskForm_Toggle: 'is-active', 
modalTaskForm: true,

act: 1,
index: i
});

}

// setting for dateTime view 
viewDateTime=(dt)=>{
dt = dt.split("T");

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var d = new Date(dt[0]);
var n = d.toLocaleDateString(['en-US'],options);

return `${n} @${dt[1]}`
}

//   TASKS DONE
taskDone=(i)=>{
let {doneTasks,tasks} = this.state;
// insert done task
doneTasks.push(tasks[i]);
// delete task from tasks
tasks.splice(i,1);

this.setState({
doneTasks,
tasks
});
}

removeDone=(i)=>{
let {doneTasks} = this.state;
// delete doneTasks
doneTasks.splice(i,1);
this.setState({
doneTasks,
});
}

unDone=(i)=>{
let {doneTasks, tasks} = this.state;
// insert in tasks
tasks.push(doneTasks[i]);

// remove in doneTasks
this.removeDone(i);
}


logout(){
    window.location.reload();
}

//..........................................................render().....................................................//
render() {
let {
modalTaskForm, modalTaskForm_Toggle, tasks,
tittle, detail, time,
doneTasks, renderTasks, navActive
} = this.state;

return (
//   hold the app  
<div className="App" style={{paddingTop:20}}>     
{/* container */}
<div className="container">
{/* Top Button */}
<div className="columns" style={{position:'fixed'}}>
<div className="column is-12">

<div className="field has-addons">
<p className="control">
<a className="button is-link is-rounded"
onClick={()=>this.modalTaskForm(!modalTaskForm)}
>
<span className="icon">
<i className="fa fa-plus" />
</span>
<span>New</span>
</a>
</p>
<p className="control">
<a className={`button is-link ${navActive==='tasks'?'is-outlined':''}`}
onClick={()=>{
this.setState({
renderTasks:1,
navActive: 'tasks'
});
}}
>
<span className="icon">
<i className="fa fa-tasks" />
</span>
<span>Tasks ( {tasks.length} )</span>
</a>
</p>
<p className="control">
<a className={`button is-link ${navActive==='done'?'is-outlined':''}`}
onClick={()=>{
this.setState({
renderTasks: 2,
navActive: 'done'
});
}}
>
<span className="icon">
<i className="fa fa-check" />
</span>
<span>Done ( {doneTasks.length} )</span>
</a>
</p>
</div>

</div>
</div>
<div class="field " >
              <p class="control">
                <button
                  class="button is-warning hey"
                  type="button"
                  onClick={this.logout.bind(this)}
                >
                  Logout 
                </button>
                </p>
                </div>

{/* TODO LIST */}
<div style={{paddingTop:60}}>

{   renderTasks===1 &&
tasks.map((data, i) =>
<div className="columns" key={i}>
<div className="column is-12">
<article className="media">
<div className="media-content">
<div className="content">
<p>
<strong>{data.tittle}</strong>
<br/>
<small>{this.viewDateTime(data.time)}</small>
<br/>
{data.detail}
</p>
</div>
<nav className="level is-mobile">
<div className="level-left">
<a className="level-item"
onClick={()=>this.taskDone(i)}
>
<span className="icon"><i className="fa fa-lg fa-check"></i></span>
</a>

<a className="level-item"
onClick={()=>this.fEdit(i)}
>
<span className="icon"><i className="fa fa-lg fa-pencil-alt"></i></span>
</a>
</div>
</nav>
</div>
<div className="media-right">
<button className="delete"
onClick={()=>this.fRemove(i)}
></button>
</div>
</article>
</div>
</div>                        
)
}

{   renderTasks===2 &&
doneTasks.map((data, i) =>
<div className="columns" key={i}>
<div className="column is-12">
<article className="media">
<div className="media-content">
<div className="content">
<p>
<strong>{data.tittle}</strong>
<br/>
<small>{this.viewDateTime(data.time)}</small>
<br/>
{data.detail}
</p>
</div>
<nav className="level is-mobile">
<div className="level-left">
<a className="level-item"
onClick={()=>this.unDone(i)}
>
<span className="icon"><i className="fa fa-lg fa-undo"></i></span>
</a>


</div>
</nav>
</div>
<div className="media-right">
<button className="delete"
onClick={()=>this.removeDone(i)}
></button>
</div>
</article>
</div>
</div>                        
)
}

</div>

</div>

{/* MODAL - TASK FORM (our inside the (+))*/}
<div className={`modal ${modalTaskForm_Toggle}`}>{/*Trigger the modal for one and close */}
<div className="modal-background" onClick={()=>this.modalTaskForm(!modalTaskForm)}></div>
<div className="modal-content">
    
<form ref="myForm" className="myForm">
<div className="field">
<div className="control">
<label className="label" style={{color:'#fff'}}>Tittle</label>
<input className="input is-info" type="text" name='tittle' value={tittle} 
onChange={(e)=>this.inputChange(e)}/>
</div>
</div>
<div className="field">
<div className="control">
<label className="label" style={{color:'#fff'}}>Detail</label>
<textarea className="textarea is-info" type="text" placeholder="Info textarea"
name='detail'
value={detail}
onChange={(e)=>this.inputChange(e)}
></textarea>
</div>
</div>
<div className="field">
<div className="control">
<label className="label" style={{color:'#fff'}}>Time</label>
<input className="input is-info" type="datetime-local" name='time' value={time} 
onChange={(e)=>this.inputChange(e)}/>
</div>
</div>
<button className="button is-info"
onClick={(e)=>this.submitTask(e)}
>Save</button>
</form>

</div>
<button className="modal-close is-large" aria-label="close"
onClick={()=>this.modalTaskForm(!modalTaskForm)}
></button>

</div>

</div>

);
}
}
export default Todolist