
import styled from "styled-components";
import { useEffect, useState } from "react";

const Event = () =>{
  const [eventView,setEventView] = useState([])
    useEffect(()=>{
      fetch(`https://openapi.its.go.kr:9443/eventInfo?apiKey=${process.env.REACT_APP_ItsKey}&type=all&eventType=all&minX=126.800000&maxX=127.890000&minY=34.900000 &maxY=35.100000&getType=json`)
        .then((response)=>response.json())
        .then((response)=>{
          console.log(response.body.items)
          setEventView(response.body.items)
        }).catch((err)=>{
          console.log(err)
        })
    },[])

  return(
    <Container>
      <div>
        <Title color="tomato">사고정보</Title>
        <Content>00 구간 화물차 사고</Content>
      </div>
      {/* 돌발정보 데이터 반복 삽입 */}
      <div>
        <Title color="#FFC314">돌발정보</Title>
        {
          eventView.map((item:any)=>{
            return(
              <Content key={item.linkId}>
                <div style={{fontWeight:'bold'}}>▪{item.roadName}</div>
                {item.message !== "" ? (<div>{item.message}</div>):(item.eventDetailType)}
              </Content>
            )
            
          })
        }
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
  padding:3%;
  background-color:rgba(40,40,40,0.5);
  color:white;
  display:flex;
  flex-direction:column;
  gap:5px;
  
`
