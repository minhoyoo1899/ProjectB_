import { createStore } from "redux"

interface type{
  type:string;
}


function state(state = false, action:type){
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

export {stateStore}