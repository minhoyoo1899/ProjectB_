import styled from "styled-components";
import { FaCarAlt } from "react-icons/fa"
import {FaExclamationTriangle} from "react-icons/fa"
import {FaCarCrash} from "react-icons/fa"
import {BsFillCameraVideoFill} from "react-icons/bs"

const Bottom = () =>{
  return(
    <Container>
      <Item><BsFillCameraVideoFill/>&nbsp;&nbsp;CCTV</Item>
      <Item color="lightblue"><FaCarAlt/>&nbsp;&nbsp;도로흐름</Item>
      <Item color="#FFC314"><FaExclamationTriangle/>&nbsp;&nbsp;돌발상황</Item>
      <Item color="tomato"><FaCarCrash/>&nbsp;&nbsp;사고정보</Item>
    </Container>
  )
}

export default Bottom;

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
`