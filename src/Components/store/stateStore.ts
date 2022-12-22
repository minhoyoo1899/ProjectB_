import { createStore } from "redux"
interface type{
  type:string
  
}

function eventView(state = "",action:any){
  if(action.type === "ADD"){
    return state = action.text
  }
}


let eventViewStore = createStore(eventView)
eventViewStore.dispatch({type:"ADD",text:"123456"})
// console.log(eventViewStore.getState())

function state(state = true, action:type){
  switch (action.type){
    case "TRUE":
      return state = true
    case "FALSE":
      return state = false
    default:
      return state
  }
}
let stateStore = createStore(state)


//사고정보 리듀서
function accidentState(state = true, action:type){
  switch(action.type){
    case "TRUE":
      return state = true
    case "FALSE":
      return state = false
    default:
      return state
  }
}
let accidentStore = createStore(accidentState)


export {stateStore,accidentStore,eventViewStore}