import styled from "styled-components";
import { FaCarAlt } from "react-icons/fa"
import {FaExclamationTriangle} from "react-icons/fa"
import {FaCarCrash} from "react-icons/fa"
import { BsFillCameraVideoFill } from "react-icons/bs"
import { forwardRef, useState } from "react";
import { accidentStore, stateStore } from "../store/stateStore";
import { eventViewStore } from "../store/stateStore";
// 

  const Bottom = (props:any, ref:any) => {
    const {mapRef,cctvMarkRef} = ref
      //리덕스 세팅

  //돌발정보 마크의 옵션값 true,flase로 변경하는 리듀서에 액션값을 보냄 
  function eventClick(){
    if(stateStore.getState()===false){
      stateStore.dispatch({type:"TRUE"})
      //console.log(stateStore.getState())
    }else{
      stateStore.dispatch({type:"FALSE"})
      //console.log(stateStore.getState())
    }
  }
  //사고정보 마크의 옵션값 true,false로 변경하는 리듀서에 액션값을 보냄
  function accidentClick(){
    if(accidentStore.getState()===false){
      accidentStore.dispatch({type:"TRUE"})
    }else{
      accidentStore.dispatch({type:"FALSE"})
    }
  }

  let clicked = true
  const [isActive,setIsActive] = useState<string>("")
  // const [test, setTest]= useState<any>(ref.current)
  // console.log(test)

  return(
    <Container>
      <Item 
      color={isActive}
      onClick={()=>{
        if(clicked === true){
            // console.log(ref.current[0])
            ref.current.map((el:any,id:number)=>{
              ref.current[id].setVisible(false)
            })
            clicked = false
            setIsActive("#555")
        }
        else if(clicked === false) {
          ref.current.map((el:any,id:number)=>{
            ref.current[id].setVisible(true)
          })
          clicked = true
          setIsActive("#fff")
        }
      }}><BsFillCameraVideoFill/>&nbsp;&nbsp;CCTV</Item>
      <Item color="lightblue"><FaCarAlt/>&nbsp;&nbsp;도로흐름</Item>
      <Item onClick={eventClick} color="#FFC314"><FaExclamationTriangle/>&nbsp;&nbsp;돌발상황</Item>
      <Item color="tomato" onClick={accidentClick}><FaCarCrash/>&nbsp;&nbsp;사고정보</Item>
    </Container>
  )
}
// BFBFBF
// E6E6E6
export default forwardRef(Bottom);

const Container = styled.div`
  display:flex;
  justify-content:space-between;
  width:max-content;
  height:40px;
  position:absolute;
  bottom:5%;
  z-index:1;
  gap:5%;
`

const Item = styled.div`
  
  display:flex;
  justify-content:center;
  align-items:center;
  width:120px;
  min-width:max-content;
  height:100%;
  background-color:#333;
  border-radius:5px;
  color:${props=>props.color || "white"};
  font-weight:bold;
  font-size:.8em;
  padding:10px;
  cursor:pointer;
`