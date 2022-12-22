import React, { useEffect, useRef, useState, ReactNode, forwardRef } from 'react'
import axios from "axios"
import styled from 'styled-components'
import Side from '../Main/Side'
import Bottom from '../Main/Bottom'
import { stateStore } from '../store/stateStore'
import { response } from 'express'
import Weather from '../Main/Weather'

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
  // useEffect(()=> {
  //   const getDatas = async()=>{
  //     // const datas = await axios.get("http://localhost:6565/route")
  //     // console.log(datas)
  //     const cctvData = await axios.get("http://localhost:8282/cctv")
  //     // console.log(cctvData.data.response.data)
  //     // console.log(cctvData.data.response.data)
  //     cctvPos.current = cctvData.data.response.data
  //     let cctvCoord = cctvData.data.response.data
  //     // console.log(cctvCoord)
  //     setCctv(cctvCoord)
  //     testArr.push(cctvCoord)
  //     // console.log(testArr[0])
      

  //     // setCctv({
  //     //   lat : Number(cctvCoord.coordy),
  //     //   lng : Number(cctvCoord.coordx)
  //     // })
  //     // const routePath = datas.data.route.traoptimal[0].path
  //   }
  //   getDatas();
  // },[])

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
  const [zoom, setZoom] = useState<number>(10)
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
    trafficLayer.setMap(mapRef.current)
    naver.maps.Event.once(mapRef.current,"init",(e)=>{
      trafficLayer.setMap(mapRef.current)
    })
  },[mapRef, centerX])
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
  },[location,centerX])
  
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
              // setCctv([])
              // // cctvMarkRef.current = []
              // cctvMarkRef.current.map((el:any,id:number)=>{
              //     cctvMarkRef.current[id].setMap(null)
              // })
              cctvWindow.close()
              }
            })
          }
        })
      })
    }, [centerX,cctv,cctvMarkRef]);
  // console.log(testArr)
  
  // useEffect(() => {
  //   if (typeof location !== "string") {
  //       //클릭한 위치에 마커 생성
  //     naver.maps.Event.addListener(mapRef.current,"click",(e)=> {
  //       // console.log(e)
  //       setCenterX(e.coord._lng)
  //       setCenterY(e.coord._lat)
  //       setZoom(17)
  //       let infoWindow = new naver.maps.InfoWindow({
  //         content: [
  //           '<div class="iw_inner">',
  //           `<h2>선택한 좌표값</h2>`,
  //           `<p>${e.coord._lat}<br>
  //           ${e.coord._lng}`,
  //           '</p>',
  //           '</div>'
  //         ].join('')
  //       });
  //       let newMarker = new naver.maps.Marker({
  //         position:e.coord,
  //         map:mapRef.current
  //       })
  //       if(infoWindow.getMap()) {
  //         infoWindow.close()
  //       } else {
  //         infoWindow.open(mapRef.current,newMarker)
  //       }
  //     })
  //   }
  // }, [ centerX]);


  //돌발정보 마커 생성
  
  //**돌발정보 마커 생성
  useEffect(()=>{
    let test:any = []


  stateStore.subscribe(()=>{
    // markRef.current.getVisible(stateStore.getState())

    //스토어 값이 변경될때 마커 출력or숨김 변경
    stateStore.subscribe(()=>{

    test.map((item:any)=>{
      item.setVisible(stateStore.getState())
      console.log(item.visible)
    })
  })

    // fetch("http://localhost:8282/event")
    // .then((response)=>response.json())
    // .then((response)=>{
    //   // console.log(response)
    //   for(let i in response){
    //     if(response[i].eventType !== '교통사고'){
    //       markRef.current = new naver.maps.Marker({
    //         position:new naver.maps.LatLng(response[i].coordY,response[i].coordX),
    //         map:mapRef.current,
    //         //visible: false
    //       })
    //       test.push(markRef.current)
    //       // console.log(test)
    //       //console.log(response[i].coordY)
    //       //console.log(markRef)
    //     }
        
    //   }
    // }).catch((err)=>{
    //   console.log(err)
    // })

    fetch("http://localhost:8282/event")
    .then((response)=>response.json())
    .then((response)=>{
      //console.log(response)
      for(let i in response){
        if(response[i].eventType !== '교통사고'){
          //돌발상황 마크 생성
          let evnetMark = new naver.maps.Marker({ 
            position:new naver.maps.LatLng(response[i].coordY,response[i].coordX),
            map:mapRef.current,
            icon:{
              url: '../img/error.png',
              scaledSize : new naver.maps.Size(30,30)
            },
            visible:true
          })
          test.push(evnetMark)
          console.log(test)
        }
        
      }
    }).catch((err)=>{
      console.log(err)
    })

  },[]);


  const navigation:any = []

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
              console.log(res)
              const polyline = new naver.maps.Polyline({
                map: mapRef.current,
                path: res.map((item:any)=>{
                  return new naver.maps.LatLng(
                    item.node_Ycode,item.node_Xcode)
                }),
                strokeColor: "#0000ff",
                strokeWeight: 5,
              });
              navigation.pop()
              navigation.pop()
            })
          }
        })
      })
    })
  },[])

  return (
    <Bg>
      <MapBox id="map">
        <Weather props={{ centerX, centerY }} />
        <Side/>
        <Bottom ref={cctvMarkRef}/>
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