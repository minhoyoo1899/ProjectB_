import { createStore } from "redux"
interface type{
  type:string,
}


//*정보창 관련 리듀서
// 1. state : 사이드 메뉴에 돌발,사고정보를 클릭했을때 가져올 값을 text속성에 저장함
function eventView(state = "",action:any){
  if(action.type === "ADD"){
    return state = action.text
  }
}
let eventViewStore = createStore(eventView)
eventViewStore.dispatch({type:"ADD",text:""})
// console.log(eventViewStore.getState())


//*돌발정보 리듀서
// 1. state : 하단탭 눌렀을때 마크의 visible 속성을 true, flase로 변경할 값
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


//*사고정보 리듀서
// 1. state : 하단탭 눌렀을때 마크의 visible 속성을 true, flase로 변경할 값

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



//* 주소 좌표 저장
function addressState(state = [], action:any){
    console.log(action.text)
    return state = action.text;
}

let addressStore = createStore(addressState)


export {stateStore,accidentStore,eventViewStore,addressStore}