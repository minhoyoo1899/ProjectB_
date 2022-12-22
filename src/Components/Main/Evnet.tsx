
import styled from "styled-components";
import { useEffect, useState, forwardRef } from "react";
import Map from "../Map/Map";
import { eventViewStore } from "../store/stateStore";

const Event = () =>{
  
  const test = 
    [
      {
          "type": "고속도로",
          "eventType": "작업",
          "eventDetailType": "작업",
          "startDate": "20221220093317",
          "coordX": "127.4226",
          "coordY": "36.4137",
          "linkId": "1870199600",
          "roadName": "경부선",
          "roadNo": "1",
          "roadDrcType": "기점",
          "lanesBlockType": "",
          "lanesBlocked": "",
          "message": "(갓길)방초매트설치작업중",
          "endDate": ""
      },
      {
          "type": "고속도로",
          "eventType": "기타돌발",
          "eventDetailType": "고장",
          "startDate": "20221220090802",
          "coordX": "127.3164",
          "coordY": "36.2853",
          "linkId": "1850324300",
          "roadName": "호남지선",
          "roadNo": "251",
          "roadDrcType": "기점",
          "lanesBlockType": "",
          "lanesBlocked": "",
          "message": "(갓길)소형화물차고장처리중",
          "endDate": ""
      },
      {
          "type": "고속도로",
          "eventType": "작업",
          "eventDetailType": "작업",
          "startDate": "20221220111308",
          "coordX": "127.3158",
          "coordY": "36.2949",
          "linkId": "1860631500",
          "roadName": "호남지선",
          "roadNo": "251",
          "roadDrcType": "종점",
          "lanesBlockType": "",
          "lanesBlocked": "2차로 차단",
          "message": "(2차로)노면보수작업중",
          "endDate": ""
      },
      {
          "type": "고속도로",
          "eventType": "작업",
          "eventDetailType": "작업",
          "startDate": "20221220092119",
          "coordX": "127.2702",
          "coordY": "36.4382",
          "linkId": "4130093800",
          "roadName": "당진대전선",
          "roadNo": "30",
          "roadDrcType": "종점",
          "lanesBlockType": "",
          "lanesBlocked": "1차로 차단",
          "message": "(1차로)시설물보수작업중",
          "endDate": ""
      },
      {
          "type": "고속도로",
          "eventType": "공사",
          "eventDetailType": "작업",
          "startDate": "20221220085005",
          "coordX": "127.5292",
          "coordY": "36.3356",
          "linkId": "2760275600",
          "roadName": "경부선",
          "roadNo": "1",
          "roadDrcType": "종점",
          "lanesBlockType": "",
          "lanesBlocked": "",
          "message": "(갓길)표지판교체작업중",
          "endDate": ""
      },
      {
          "type": "고속도로",
          "eventType": "공사",
          "eventDetailType": "작업",
          "startDate": "20221220091833",
          "coordX": "127.3204",
          "coordY": "36.3936",
          "linkId": "1860167900",
          "roadName": "당진대전선",
          "roadNo": "30",
          "roadDrcType": "기점",
          "lanesBlockType": "",
          "lanesBlocked": "2차로 차단",
          "message": "(2차로)VMS설치작업중",
          "endDate": ""
      },
      {
          "type": "고속도로",
          "eventType": "공사",
          "eventDetailType": "작업",
          "startDate": "20221220092459",
          "coordX": "127.4906",
          "coordY": "36.2119",
          "linkId": "2920027003",
          "roadName": "통영대전선",
          "roadNo": "35",
          "roadDrcType": "기점",
          "lanesBlockType": "",
          "lanesBlocked": "",
          "message": "(갓길)시설물점검작업중",
          "endDate": ""
      },
      {
          "type": "고속도로",
          "eventType": "기타돌발",
          "eventDetailType": "고장",
          "startDate": "20221220104724",
          "coordX": "127.2498",
          "coordY": "36.4634",
          "linkId": "4130116700",
          "roadName": "당진대전선",
          "roadNo": "30",
          "roadDrcType": "기점",
          "lanesBlockType": "",
          "lanesBlocked": "",
          "message": "(갓길)소형화물고장차처리중",
          "endDate": ""
      },
      {
          "type": "고속도로",
          "eventType": "교통사고",
          "eventDetailType": "충돌사고",
          "startDate": "20221220091000",
          "coordX": "127.3174",
          "coordY": "36.2905",
          "linkId": "1860631600",
          "roadName": "호남지선",
          "roadNo": "251",
          "roadDrcType": "기점",
          "lanesBlockType": "",
          "lanesBlocked": "",
          "message": "승용차 단독사고, 종료",
          "endDate": ""
      },
      {
          "type": "국도",
          "eventType": "교통사고",
          "eventDetailType": "충돌사고",
          "startDate": "20221220000000",
          "coordX": "127.27543",
          "coordY": "36.41606",
          "linkId": "2860255507",
          "roadName": "국도1호선",
          "roadNo": "1",
          "roadDrcType": "시점방향",
          "lanesBlockType": "",
          "lanesBlocked": "1 차로",
          "message": "승용차 단독사고, 종료",
          "endDate": ""
      },
      {
          "type": "국도",
          "eventType": "공사",
          "eventDetailType": "시설물보수작업",
          "startDate": "20221220000000",
          "coordX": "127.26385",
          "coordY": "36.33656",
          "linkId": "1860633200",
          "roadName": "국도1호선",
          "roadNo": "1",
          "roadDrcType": "종점방향",
          "lanesBlockType": "",
          "lanesBlocked": "1 차로",
          "message": "",
          "endDate": ""
      }
  ]

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
    //console.log(target.linkId)
    eventViewStore.dispatch({type:"ADD",text:target.linkId})
  }

  return(
    <Container>
      <div>
        <Title color="tomato">사고정보</Title>
        <Content>
        {
          test.map((item:any)=>{
            if(item.eventType === '교통사고'){
              count1++;
              return (
                <Item key={item.linkId} onClick={()=>infoView(item)}>
                  <div>🚗 {item.roadName} → {item.eventType} ({item.eventDetailType})</div>
                    <div style={{fontSize:'x-small',paddingLeft:'20px'}}>{item.message}</div> 
                </Item>
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
          test.map((item:any)=>{
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
  gap:20px;
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

