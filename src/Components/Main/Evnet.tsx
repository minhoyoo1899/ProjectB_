
import styled from "styled-components";
import { useEffect, useState } from "react";

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
          "eventType": "공사",
          "eventDetailType": "작업",
          "startDate": "20221220091000",
          "coordX": "127.3174",
          "coordY": "36.2905",
          "linkId": "1860631600",
          "roadName": "호남지선",
          "roadNo": "251",
          "roadDrcType": "기점",
          "lanesBlockType": "",
          "lanesBlocked": "",
          "message": "(갓길)이동잡목제거작업중",
          "endDate": ""
      },
      {
          "type": "국도",
          "eventType": "교통사고",
          "eventDetailType": "시설물보수작업",
          "startDate": "20221220000000",
          "coordX": "127.27543",
          "coordY": "36.41606",
          "linkId": "2860255507",
          "roadName": "국도1호선",
          "roadNo": "1",
          "roadDrcType": "시점방향",
          "lanesBlockType": "",
          "lanesBlocked": "1 차로",
          "message": "교통사고",
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
  
  const [check,setCheck] = useState(false)
  const [eventView,setEventView] = useState([])
    // useEffect(()=>{
    //   fetch(`https://openapi.its.go.kr:9443/eventInfo?apiKey=9e76fe76e732482fa9e68860dc39c0ce&type=all&eventType=all&minX=127.234227&maxX=127.570949&minY=36.192958&maxY=36.488949&getType=json`)
    //     .then((response)=>response.json())
    //     .then((response)=>{
    //       //console.log(response.body.items)
    //       setEventView(response.body.tems)
    //     }).catch((err)=>{
    //       console.log(err)
    //     })
    // },[])
    

  let count1 = 0; //사고정보
  let count2 = 0; //돌발정보

  return(
    <Container>
      <div>
        <Title color="tomato">사고정보</Title>
<<<<<<< HEAD
        <Content>
        {
          test.map((item:any)=>{
            if(item.eventType === '교통사고'){
              count1++;
              return (
                <div key={item.linkId}>
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
=======
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
>>>>>>> origin/Maps
        

      </div>
      {/* 돌발정보 데이터 반복 삽입 */}
      <div>
        <Title color="#FFC314">돌발정보</Title>
<<<<<<< HEAD
        <Content>
        {
          test.map((item:any)=>{
            if(item.eventType !== '교통사고'){
              count2++;
              return (
                <div key={item.linkId}>
                  <div>{item.roadName}</div>
                  {item.message !== "" ? 
                    <div>{item.message}</div> :
                    <div>{item.eventType}</div>
                  }
                  
                </div>
              )
            }
          })
        }
        {
          count2 === 0 ? <div style={{alignItems:"center",display:'flex',justifyContent:'center'}}>돌발 정보가 없습니다.</div>:null
        }

        </Content>
=======
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
>>>>>>> origin/Maps
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
  min-height:max-content;
  max-height:200px;
  padding:4%;
  background-color:rgba(40,40,40,0.5);
  backdrop-filter:blur(10px);
  color:white;
  display:flex;
  flex-direction:column;
  gap:5px;
  overflow-y:scroll;
  ::-webkit-scrollbar{
    display:none;
  }
  border-radius:0px 0px 5px 5px;
  
`

