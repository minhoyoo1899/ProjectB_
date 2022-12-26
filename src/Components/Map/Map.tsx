import React, { useEffect, useRef, useState, ReactNode, forwardRef } from 'react'
import axios from "axios"
import styled from 'styled-components'
import Side from '../Main/Side'
import Bottom from '../Main/Bottom'
import e, { response } from 'express'
import Weather from '../Main/Weather'
import { eventViewStore, accidentStore,stateStore } from '../store/stateStore'


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



interface Main {
  children: ReactNode;
}
let testArr:any[] = [];

function Map() {
  //현위치 마커

  const markRef = useRef<any>();  
  //cctv 마커 
  const cctvMarkRef = useRef<any>([])

  //지도용
  const mapRef = useRef<any>()
  //cctv 정보
  const cctvPos = useRef<any>()
  //현재 좌표의 위도 경도 담을 스테이트 
  const [location, setLocation] = useState<any>({
    latitude: "",
    longitude : ""
  })
  
  //cctv 좌표 담을 스테이트
  const [cctv, setCctv] = useState<any>([])
  //cctv 기본정보 담을 스테이트 
  const [cctvInfo, setCctvInfo] = useState<any>()

  
  //서버에 요청 
  useEffect(()=> {
    const getDatas = async()=>{
      // const datas = await axios.get("http://localhost:6565/route")
      // console.log(datas)
      const cctvData = await axios.get("http://localhost:8282/cctv")
      // console.log(cctvData.data.response.data)
      // console.log(cctvData.data.response.data)
      cctvPos.current = cctvData.data.response.data
      let cctvCoord = cctvData.data.response.data
      // console.log(cctvCoord)
      setCctv(cctvCoord)
      testArr.push(cctvCoord)
      // console.log(testArr[0])
      
      
      // setCctv({
        //   lat : Number(cctvCoord.coordy),
        //   lng : Number(cctvCoord.coordx)
        // })
        // const routePath = datas.data.route.traoptimal[0].path
      }
      getDatas();
    },[])
    
    // 현재위치의 위도값과 경도값을 받아서 state 저장 
    useEffect(()=> {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position)
          setLocation({
            latitude: Number(position.coords.latitude),
            longitude: Number(position.coords.longitude),
          });
        });
      } else {
        window.alert("현재위치를 알수 없습니다.");
      }
    },[])
    //지도 중앙좌표값
    const [centerX, setCenterX] = useState<number>(127.3845475)
    const [centerY, setCenterY] = useState<number>(36.3504119)
    // 지도 줌 값 
    const [zoom, setZoom] = useState<number>(17)
    //지도 교통 흐름도 옵션 
    const [isTrafficAvtive, setIsTrafficActive] = useState<boolean>(true)
    // let isTrafficAvtive = true

    const changeTraffic = (e:any) => {
      
      if(isTrafficAvtive === true){
        console.log("비활성화")
        setIsTrafficActive(false)
      }
      else if (isTrafficAvtive === false){
        console.log("활성화")
        setIsTrafficActive(true)
      }
    }
    // 지도
    useEffect(()=>{
      let trafficLayer = new naver.maps.TrafficLayer({
        interval: 300000 // 5분마다 새로고침 (최소값 5분)
      });
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(centerY,centerX),
        zoom:zoom,
        mapTypeControl: true,
        // zoomControl: true,  
    });
    if (isTrafficAvtive === true) {
      trafficLayer.setMap(mapRef.current)
      naver.maps.Event.once(mapRef.current,"init",(e)=>{
        trafficLayer.setMap(mapRef.current)
      })
    }
    else if (isTrafficAvtive === false){
      trafficLayer.setMap(null)
    }
  },[mapRef, centerX, isTrafficAvtive])
  // console.log(centerX,centerY)
  
  //현재위치 마커 
  useEffect(()=> {
      const currentPosition = [location.latitude, location.longitude];
      
      //마커관련
      markRef.current = new naver.maps.Marker({
        position : new naver.maps.LatLng(currentPosition[0],currentPosition[1]),
        map : mapRef.current,
        // 아이콘 커스텀
        icon: {
          url: "https://mblogthumb-phinf.pstatic.net/MjAyMTA4MDRfMjk0/MDAxNjI4MDg2MDEwNTY4.TTh8QJAkzwBZZpKSw8OpIK83JQ8dBBI5qBu9uWvgrKUg.X2keaCQ5fJkyx05OOlVYwKPi3ynq0_oqHv-UFqLyGsQg.PNG.cha-cha97/%EC%B6%98%EC%8B%9D%EC%9D%B4%EF%BC%BF001.png?type=w800", 
          scaledSize : new naver.maps.Size(80,80),
        }
      })
  },[location,centerX,isTrafficAvtive])
  
  //cctv 띄우는 코드 
  useEffect(()=>{
    cctv.map((el:any,id:number)=>{
      // console.log(el.coordx, el.coordy)
      //cctv 마커 
      let cctvM = new naver.maps.Marker({
        position: new naver.maps.LatLng(el.coordy,el.coordx),
        map : mapRef.current,
        icon: {
          url: "Img/cctv2.png", 
          scaledSize : new naver.maps.Size(32,32),
        }
      })
      cctvMarkRef.current.push(cctvM)
      // console.log(cctvMarkRef.current)

      //Cctv 마커클릭 했을때 
      naver.maps.Event.addListener(cctvMarkRef.current[id],"click",(e)=>{
        // console.log(cctv[id])
        // console.log(mapRef.current)
        // console.log("e")
        let cctvWindow = new naver.maps.InfoWindow({
          //cctv 아이콘 클릭시 나타날 컨텐츠
          content: [
            '<div style="width:400px; height:400px; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:10px;"}}>',
            `<h3>${cctv[id].cctvname}</h3>`,
            `<video src=${cctv[id].cctvurl} width="400px" height="300px" controls autoplay playsinline muted type="application/x-mpegURL"></video>`,
            '</div>'
          ].join('') 
        });
        
        let newMarker = new naver.maps.Marker({
          position:e.coord,
          map:mapRef.current
        })
        if(cctvWindow.getMap()) {
          cctvWindow.close()
        } else {
          cctvWindow.open(mapRef.current,newMarker)
          newMarker.setMap(null)
          console.log(cctvMarkRef.current.visible)
          //cctv 창이 뜬 상태에서 지도 클릭시 cctv 창 닫기
          naver.maps.Event.addListener(mapRef.current,"click",()=>{
            if(e.domEvent.type === "click"){
              cctvWindow.close()
              }
            })
          }
        })
      })
    }, [centerX,cctv,cctvMarkRef,isTrafficAvtive]);
  // console.log(testArr)

  //돌발정보 마커 생성
  

  //!돌발정보 마커 생성 --- 테스트용 데이터로 작업한 내용
  useEffect(()=>{

    //* 교통사고와 교통사고 외의 돌발상황을 분리하여 작성함
    //* 1. eventMark : 돌발정보 마크
    //* 2. infowindow : 정보창
    // 마크를 클릭하면 정보창 표시, 
    // 사이드바의 사고,돌발 정보를 클릭했을때 eventViewStore리듀서의 state 값이 변경되면서 
    // 해당 마크 위치에 정보창이 출력됨.
    //* 3. eventArr: 돌발상황 마크들을 배열에 저장해놓음, 
    // stateStore리듀서에서 state 값이 변경되면 배열에 있는 마크들의 visible값을 false로 변경하여 숨김

    let eventArr:any = [];
    stateStore.subscribe(()=>{
      eventArr.map((item:any)=>{
        item.setVisible(stateStore.getState())
        //console.log(item.visible)
      })
    })

    
    for(let i in test){
      if(test[i].eventType !== "교통사고"){
        let eventMark = new naver.maps.Marker({
          position: new naver.maps.LatLng(Number(test[i].coordY),Number(test[i].coordX)),
          map:mapRef.current,
          icon:{
            url:"../img/error.png",
            scaledSize:new naver.maps.Size(30,30)
          },
          visible:true
        })
        let infowindow = new naver.maps.InfoWindow({
          content:
          `<div>
              <div style="background-color:#35BABC;color:white; padding:10px">${test[i].roadName}</div>
              <div>${test[i].eventType}(${test[i].eventDetailType})</dvi>
          </div>`
        })
        naver.maps.Event.addListener(eventMark,'click',(e)=>{
          if(infowindow.getMap()){
            infowindow.close();
          }else{
            infowindow.open(mapRef.current,eventMark)
          }
        })

        eventViewStore.subscribe(()=>{
          if(test[i].linkId === eventViewStore.getState()){
            if(infowindow.getMap()){
              infowindow.close()
              //console.log('얘는 되냐')
            }else{
              infowindow.open(mapRef.current,eventMark)
            }
          }
        })
        eventArr.push(eventMark)
        
        

      }
    }
  },[])



  
  const [stroke, setStroke] = useState<number>(5)

  // 종인 작업 충돌 부분 수정
  const navigation:any = []
  let activePath:any = []
  let activenode:any = []
  let color = ''
  let eventCoord:any = []

  useEffect(()=>{
    fetch('http://127.0.0.1:8282/deajeonNode')
    .then((res)=>res.json())
    .then((res)=>{
      res.map((item:any)=>{
        let node = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            item.node_Ycode,item.node_Xcode),
          map : mapRef.current,
          icon: {
            url: "Img/cctv.png", 
            scaledSize : new naver.maps.Size(8,8),
          }
        })
        node.addListener('click',()=>{
          navigation.push(item)
          // console.log(navigation)
          if(navigation.length === 2){
            fetch('http://127.0.0.1:8282/navigation',{
              method: "POST",
              headers: {
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                start: navigation[0],
                end: navigation[1],
              }),
            })
            .then((res)=>res.json())
            .then((res)=>{
              activenode.push(res)
              for(let i=0; i<res.length-1;i++){
                activePath.push(res[i].node_id,res[i+1].node_id)
              }
              console.log(activePath)
                fetch('http://127.0.0.1:8282/activePath',{
                  method: "POST",
                  headers: {
                    'Content-Type':'application/json'
                  },
                  body: JSON.stringify({
                    way : activePath
                  })
                })
                .then((res)=>res.json())
                .then((data)=>{
                  let dataArr = []
                  for(let i=0; i<data.length;i++){
                    // console.log(data[i][0].LINK_ID)
                    dataArr.push(data[i][0].LINK_ID)
                  }
                  // console.log(dataArr)
                  return dataArr
                })
                .then((arr)=>{
                  const getLinkData = fetch('http://127.0.0.1:8282/linkData',{
                    method: "POST",
                    headers: {
                      'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                      data : arr
                    }),
                  })
                  .then((res)=>res.json())
                  .then((congestion)=>{
                    // console.log(congestion)
                    // console.log(congestion[0])
                    let congestionArr = []
                    for(let i=0; i<congestion.length;i++){
                      // console.log(congestion[i][0].congestion)
                      congestionArr.push(congestion[i][0].congestion)
                    }
                    console.log(congestionArr)
                    //혼잡도 데이터로 map돌림
                    congestionArr.map((el,i)=>{
                      console.log(el)
                      if(el === 0){
                        color = '#555'
                        console.log("w")
                      }else if (el === 1){
                        color = "green"
                        console.log("w")
                      }else if (el === 2){
                        color = "orange"
                        console.log("w")
                      }else if (el === 3){
                        color = "red"
                        console.log("w")
                      }
                      const polyline = new naver.maps.Polyline({
                        map: mapRef.current,
                        path: [
                          new naver.maps.LatLng(
                            activenode[0][i].node_Ycode,activenode[0][i].node_Xcode),
                          new naver.maps.LatLng(
                            activenode[0][i+1].node_Ycode,activenode[0][i+1].node_Xcode)
                          ],
                        clickable:true,
                        strokeColor: color,
                        strokeWeight: 10,
                      });
                      //마우스오버 이벤트 
                      naver.maps.Event.addListener(polyline,"mouseover",(event)=>{
                        // console.log(event.coord.y,event.coord.x)
                        eventCoord.push(event.coord.y,event.coord.x)
                        // console.log(i,"over",activePath[i])
                        const overdLink = fetch('http://127.0.0.1:8282/mouseover',{
                            method: "POST",
                            headers: {
                              'Content-Type':'application/json'
                            },
                            body: JSON.stringify({
                              node:activePath[i]
                            }),
                          })
                          // console.log(overdLink)
                          .then((res)=>res.json())
                          .then((data)=>{
                            console.log(data.response.body["TRAFFIC-LIST"]["TRAFFIC"])
                            
                            let overedPathInfo = data.response.body["TRAFFIC-LIST"]["TRAFFIC"]
                            console.log(eventCoord)
                            console.log(overedPathInfo.roadName._text)
                            naver.maps.Event.addListener(polyline,"mouseout",()=>{
                              activePath = []
                            })
                            //마우스오버시 띄울 정보창 
                            let roadInfoWindow = new naver.maps.InfoWindow({
                              content: [
                                '<div style="width:400px; height:400px; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:10px;"}}>',
                                `<h3>${overedPathInfo.roadName._text}</h3>`,
                                '</div>'
                              ].join('') 
                            })

                            let roadInfoMarker = new naver.maps.Marker({
                              position: new naver.maps.LatLng(eventCoord[0],eventCoord[1]),
                              map : mapRef.current
                            })

                            roadInfoWindow.open(markRef.current,roadInfoMarker)
                            roadInfoMarker.setMap(null)
                            naver.maps.Event.addListener(mapRef.current,"click",(e)=>{
                              if(e.domEvent.type === "click"){
                                roadInfoWindow.close()
                              }
                            })

                            // if(roadInfoWindow.getMap()){
                            //   roadInfoWindow.close()
                            // } else {
                            // }

                          })
                      })//마우스오버이벤트 
                    })
                  })
                })
                        // naver.maps.Event.addListener(polyline,"mouseover",()=>{
                          // console.log(res[i].node_id)
                          // console.log(res[i+1].node_id)
                          // activePath.push(res[i].node_id,res[i+1].node_id)
                          // console.log(activePath)
                          // console.log(i)
                          // fetch('http://127.0.0.1:8282/activePath',{
                          //   method: "POST",
                          //   headers: {
                          //     'Content-Type':'application/json'
                          //   },
                          //   body: JSON.stringify({
                          //     first: activePath[0],
                          //     second: activePath[1],
                          //   }),
                          // })
                          // .then((res)=>res.json())
                          // .then((data)=>{
                          //   console.log(data[0].LINK_ID)
                          //   const linkData = data[0].LINK_ID
        
                            // const getLinkData = fetch('http://127.0.0.1:8282/linkData',{
                            //   method: "POST",
                            //   headers: {
                            //     'Content-Type':'application/json'
                            //   },
                            //   body: JSON.stringify({
                            //     data : linkData
                            //   }),
                            // })
                            // .then((res)=>res.json())
                            // .then((data)=>{
                            //   console.log(data.elements[0].elements[1].elements[0].elements[0].elements[0].elements[0].text)
                            // })
                          // })
                        // })
                        // naver.maps.Event.addListener(polyline,"mouseout",()=>{
                        //   activePath = []
                        // })
                      // })
                    // })
                  
                  navigation.pop()
                  navigation.pop()
                })
                // 마우스 오버되면 오버된 폴리라인의 시작,끝 노드 배열에 담음 
                // 마우스 아웃되면 배열 초기화 
          }
        })
      })
    })
  },[eventCoord,activePath, navigation])

//*사고정보 마커 생성 --(돌발상황 마크 생성과 같은방식)
useEffect(()=>{

  let accidentArr:any = []
  accidentStore.subscribe(()=>{
    accidentArr.map((item:any)=>{
      item.setVisible(accidentStore.getState())
    })
  })

  for(let i in test){
    if(test[i].eventType === '교통사고'){
      let accidentMark = new naver.maps.Marker({
        position : new naver.maps.LatLng(Number(test[i].coordY),Number(test[i].coordX)),
        map:mapRef.current,
        icon:{
          url:"../img/car.png",
          scaledSize: new naver.maps.Size(30,30)
        }
      })
      let infowindow = new naver.maps.InfoWindow({
        content:
        `<div>
            <div style="background-color:#35BABC;color:white; padding:10px">${test[i].roadName}</div>
            <div>${test[i].eventType}(${test[i].eventDetailType})</dvi>
        </div>`
      })
      naver.maps.Event.addListener(accidentMark,'click',(e)=>{
        if(infowindow.getMap()){
          infowindow.close();
        }else{
          infowindow.open(mapRef.current,accidentMark)
        }
      })
      
      //사고정보 정보창 생성
      eventViewStore.subscribe(()=>{
       
        if(test[i].linkId === eventViewStore.getState()){
         
          if(infowindow.getMap()){
            
            infowindow.close()
          }else{
            infowindow.open(mapRef.current,accidentMark)
            
          }
          
        }
      })


      accidentArr.push(accidentMark)

    }
  }
},[])


  //*돌발정보 마커 생성 -- 기존 api데이터 받아와서 작업한 내용
  // useEffect(()=>{
  //   let test:any = []

  //   //스토어 값이 변경될때 마커 출력or숨김 변경
  //   stateStore.subscribe(()=>{
  //   test.map((item:any)=>{
  //     item.setVisible(stateStore.getState())
  //     console.log(item.visible)
  //     })
  //   })

  //   fetch("http://localhost:8282/event")
  //   .then((response)=>response.json())
  //   .then((response)=>{
  //     console.log(response)
  //     for(let i in response){
  //       if(response[i].eventType !== '교통사고'){
  //         //돌발상황 마크 생성
  //         let eventMark = new naver.maps.Marker({ 
  //           position:new naver.maps.LatLng(response[i].coordY,response[i].coordX),
  //           map:mapRef.current,
  //           icon:{
  //             url: '../img/error.png',
  //             scaledSize : new naver.maps.Size(30,30)
  //           },
  //           visible:true
  //         })

  //         let infowindow = new naver.maps.InfoWindow({
  //           content: 
  //           `<div>
  //             <div style="background-color:#35BABC;color:white; padding:10px">${response[i].roadName}</div>
  //             <div>${response[i].eventType}(${response[i].eventDetailType})</dvi>
  //           </div>`
  //         })
  //         naver.maps.Event.addListener(eventMark,'click',(e)=>{
  //           if(infowindow.getMap()){
  //             infowindow.close();
  //           }else{
  //             infowindow.open(mapRef.current,eventMark)
  //           }
  //         })
          

  //         test.push(eventMark)
  //         console.log(test)

  //         eventViewStore.subscribe(()=>{
  //           if(response[i].linkId === eventViewStore.getState()){
  //             if(infowindow.getMap()){
  //               infowindow.close()
  //             }else{
  //               infowindow.open(mapRef.current,eventMark)
  //             }
  //           }
  //         })

  //       }
        
  //     }
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // },[]);
  // }, []);




  return (
    <Bg>
      <MapBox id="map">
        <Weather props={{ centerX, centerY }} />
        <Side/>
        <Bottom ref={cctvMarkRef} istraffic={isTrafficAvtive} change = {changeTraffic}/>
      </MapBox>
    </Bg>
  )
}
  const Bg = styled.div`
  margin:0;
  padding:0;
  box-sizing: border-box;
  width : 100%;
  height :100%;
  `
  const MapBox = styled.div`
    width: 100vw;
    height: 100vh;
    z-index:0;
    padding : 2%;
  `

export default forwardRef(Map)