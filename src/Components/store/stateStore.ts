import { createStore } from "redux"
interface type{
  type:string
  
}

function test(state = "",action:any){
  if(action.type === "ADD"){
    return state = action.text
  }
}
let testStore = createStore(test)
testStore.dispatch({type:"ADD",text:"123456"})
console.log(testStore.getState())

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

export {stateStore,testStore}