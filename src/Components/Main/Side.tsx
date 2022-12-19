
import styled from "styled-components";
import Event from "./Evnet";

const Side = () =>{
  fetch("https://openapi.its.go.kr:9443/eventInfo?apiKey=Jw5fmhG87nt4HglEw8FGpOPrdRuLXzY3FsCkfGqq&type=all&eventType=all&minX=126.800000&maxX=127.890000&minY=34.900000 &maxY=35.100000&getType=json")
  .then((response)=>response.json())
  .then((response)=>{
    console.log(response)
  }).catch((err)=>{
    console.log(err)
  })
  return(
    <Container>
      <Event/>
    </Container>
  )
}

export default Side

const Container = styled.div`
  width:25%;
  height:65%;
  background-color:rgba(160,160,160,0.4);
  position:absolute;
  top:20%;
  z-index:1;
  border-radius:2px;
  padding:10px;
  
`