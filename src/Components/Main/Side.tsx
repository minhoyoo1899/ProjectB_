
import styled from "styled-components";
import Event from "./Evnet";

const Side = () =>{
  return(
    <Container>
      <Event/>
    </Container>
  )
}

export default Side

const Container = styled.div`
  width:20%;
  height:65%;
  background-color:rgba(160,160,160,0.4);
  position:absolute;
  top:20%;
  z-index:1;
  border-radius:2px;
  padding:10px;
  
`