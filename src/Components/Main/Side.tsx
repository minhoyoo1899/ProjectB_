
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
  width:250px;
  height:65%;
  min-width:200px;
  background-color:rgba(160,160,160,0.4);
  position:absolute;
  top:20%;
  z-index:1;
  border-radius:2px;
  padding:10px;
  overflow-y:scroll;
  ::-webkit-scrollbar{
    display:none;
  }
`
