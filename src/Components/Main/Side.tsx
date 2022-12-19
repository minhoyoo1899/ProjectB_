import React from "react";
import styled from "styled-components";

const Side = () =>{
  return(
    <Container>사이드 박스</Container>
  )
}

export default Side

const Container = styled.div`
  width:20%;
  height:50%;
  background-color:gray;
  position:absolute;
  top:20%;
  z-index:1;
  opacity:0.5
`