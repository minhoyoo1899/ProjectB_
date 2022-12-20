import React, { useEffect, useRef, useState, ReactNode } from 'react'
import axios from "axios"
import styled from 'styled-components'
import Side from '../Main/Side'
import Bottom from '../Main/Bottom'
import {BsFillCameraVideoFill} from "react-icons/bs"

interface Main {
  children: ReactNode;
}

function Map({ children }: Main ) {
  //현위치 마커
  const markRef = useRef<any>()
  //cctv 마커 
  const cctvMarkRef = useRef<any>()
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
      const cctvData = await axios.get("http://localhost:6565/cctv")
      // console.log(cctvData.data.response.data)
      // console.log(cctvData.data.response.data)
      cctvPos.current = cctvData.data.response.data
      let cctvCoord = cctvData.data.response.data
      // console.log(cctvCoord)
      setCctv(cctvCoord)
      

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
  const [zoom, setZoom] = useState<number>(12)
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
      cctvMarkRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(el.coordy,el.coordx),
        map : mapRef.current,
        icon: {
          url: "Img/cctv2.png", 
          scaledSize : new naver.maps.Size(32,32),
        }
      })
      // console.log(cctvMarkRef.current)
      //Cctv 마커클릭 했을때 
      naver.maps.Event.addListener(cctvMarkRef.current,"click",(e)=>{
        // console.log(cctv[id])
        // console.log(mapRef.current)
        // console.log(e)
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
        //
        //만약 cctv 가 화면에 띄워져 있을때 다른게 띄워지면 기존거 닫기 
        if(cctvWindow.getMap()) {
          cctvWindow.close()
        } 
        //cctv 가 화면에 띄워져 있지 않을때(초기화면) cctv 창 띄우기  
        else {
          cctvWindow.open(mapRef.current,newMarker)
          newMarker.setMap(null)
          //cctv 창이 뜬 상태에서 지도 클릭시 cctv 창 닫기
          naver.maps.Event.addListener(mapRef.current,"click",()=>{
              if(e.domEvent.type === "click"){
                cctvWindow.close()
              }
            })
        }
      })
    })
  },[cctv])
  
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


  return (
    <Bg>
      <MapBox id="map">
        <Side/>
        <Bottom test={mapRef}/>
      </MapBox>
    </Bg>
  )
}
  const Bg = styled.div`
  margin:0;
  padding:0;
  box-sizing: border-box;
  width : 100%;
  height :100%
  `
  const MapBox = styled.div`
    width: 100vw;
    height: 100vh;
    z-index:0;
    padding : 2%;
  `

export default Map