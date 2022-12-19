
import styled from "styled-components";

const Event = () =>{
  return(
    <Container>
      <div>
        <Title color="tomato">사고정보</Title>
        <Content>00 구간 정체중</Content>
      </div>
      <div>
        <Title color="#FFC314">돌발정보</Title>
        <Content>00 구간 화물차 사고</Content>
      </div>
      
    </Container>
  )
}
export default Event;

const Container = styled.div`
  width:100%;
  height:max-content;
  font-size:.7em;
  display:flex;
  flex-direction:column;
  gap:50px;
`

//타이틀
const Title = styled.div`
  width:100%;
  height:max-content;
  background-color:#333;
  color:${props => props.color || "red"}; 
  padding:5%;
`
//사고내용
const Content = styled.div`
  width:100%;
  height:max-content;
  padding:5%;
  background-color:rgba(40,40,40,0.5);
  color:white;
`