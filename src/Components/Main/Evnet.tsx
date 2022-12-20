
import styled from "styled-components";
import { useEffect, useState } from "react";

const Event = () =>{
  const [eventView,setEventView] = useState([])
    useEffect(()=>{
      fetch(`https://openapi.its.go.kr:9443/eventInfo?apiKey=${process.env.REACT_APP_ItsKey}&type=all&eventType=all&minX=127.234227&maxX=127.570949&minY=36.192958 &maxY=36.488949&getType=json`)
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
        {/* {
          eventView.map((item:any)=>{
            return(
              
              <Content key={item.linkId}>
                
                {item.eventType === "교통사고" ? (
                  // 이벤트 메시지가 존재하면 메시지 띄우고 없으면 이벤트타입 데이터 띄우도록
                  <>
                    <div>{item.roadName}</div>
                    {item.message !== "" ? (
                      <div>{item.message}</div>
                    ):(<div>{item.eventDetailType}</div>)}
                    
                  </>
                ):(<div>데이터가 없습니다</div>)}

              </Content>
            )
          })
        } */}
        
      </div>
      {/* 돌발정보 데이터 반복 삽입 */}
      <div>
        <Title color="#FFC314">돌발정보</Title>
        {/* {
          eventView.map((item:any)=>{
            return(
              <Content key={item.linkId}>
                {item.eventType !== "교통사고" ? (
                  <>
                    <div>{item.roadName}</div>
                    {item.message !== "" ? (
                      <div>{item.message}</div>
                    ):(<div>{item.eventDetailType}</div>)}
                  </>
                ):(null)}
              </Content>
            )
            
          })
        } */}
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

