
import styled from "styled-components";
import { useEffect, useState, forwardRef } from "react";
import Map from "../Map/Map";

const Event = () =>{
  
  const test =[]

  const [eventView,setEventView] = useState([])
    useEffect(()=>{
      fetch(`http://localhost:8282/event`)
        .then((response)=>response.json())
        .then((response)=>{
          console.log(response)
          setEventView(response)
        }).catch((err)=>{
          console.log(err)
        })
    },[])

  let count1 = 0; //사고정보 카운트
  let count2 = 0; //돌발정보 카운트
  
  
  function infoView(target:any){
    console.log(target)
    
  }

  return(
    <Container>
      <div>
        <Title color="tomato">사고정보</Title>
        <Content>
        {
          eventView.map((item:any)=>{
            if(item.eventType === '교통사고'){
              count1++;
              return (
                <div key={item.linkId} onClick={()=>infoView(item.linkId)}>
                  <div style={{fontWeight:'bold'}}>{item.roadName}</div>
                  <div>{item.message}</div>
                </div>
              )
            }
          })
        }
        {
          count1 === 0 ? <div style={{alignItems:"center",display:'flex',justifyContent:'center'}}>사고 정보가 없습니다.</div>:null
        }
        </Content>
        
      </div>
      {/* 돌발정보 데이터 반복 삽입 */}
      <div>
        <Title color="#FFC314">돌발정보</Title>
        <Content>
        {
          eventView.map((item:any)=>{
            if(item.eventType !== '교통사고'){
              count2++;
              return (
                <Item key={item.linkId} onClick={()=>infoView(item)}>
                  <div>🚨 {item.roadName} → {item.eventType} ({item.eventDetailType})</div>
                    <div style={{fontSize:'x-small',paddingLeft:'20px'}}>{item.message}</div> 
                </Item>
              )
            }
          })
        }
        {
          count2 === 0 ? <div style={{alignItems:"center",display:'flex',justifyContent:'center'}}>돌발 정보가 없습니다.</div>:null
        }

        </Content>

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
  border-radius:5px 5px 0px 0px;
`
//사고내용
const Content = styled.div`
  width:100%;
  height:max-content;
  min-height:200px;
  max-height:230px;
  padding:4%;
  background-color:rgba(40,40,40,0.5);
  backdrop-filter:blur(10px);
  color:white;
  display:flex;
  flex-direction:column;
  gap:10px;
  overflow-y:scroll;
  ::-webkit-scrollbar{
    display:none;
  }
  border-radius:0px 0px 5px 5px;
`

const Item = styled.div`
  :hover{
    color:#F4C932;
    cursor:pointer
  }
`

