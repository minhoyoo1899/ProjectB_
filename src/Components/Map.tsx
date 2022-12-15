import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import "../CSS/map.css"

function Map() {
  //마커용
  const markRef = useRef<any>()
  //지도용
  const mapRef = useRef<any>()
  //서버로 부터 받은 주소 저장할 스테이트 
  const [home, setHome] = useState<string>("")
  //현재 좌표의 위도 경도 담을 스테이트
  const [location, setLocation] = useState<any>({
    latitude: "",
    longitude : ""
  })
  //경로 그리기용 state
  const [routePathArr, setRoutePathArr] = useState<any>([])
  // console.log(routePathArr)
  
  //서버에 요청 
  useEffect(()=> {
    const getDatas = async()=>{
      const datas = await axios.get("http://localhost:6565/")
      const routePath = datas.data.route.traoptimal[0].path
      // console.log(routePath)
      setRoutePathArr(routePath)
      // console.log(datas.data.addresses[0].roadAddress)
      // let myhome = datas.data.addresses[0].roadAddress
      // setHome(myhome)
    }
    getDatas();
  },[])
  
  // 현재위치의 위도값과 경도값을 받아서 state 저장 
  useEffect(()=> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        setLocation({
          latitude: Number(position.coords.latitude),
          longitude: Number(position.coords.longitude),
        });
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  },[])
  console.log(location)

  //경로 그리기용 path 담을 배열 
  let polylinePath:Number[] = []
  routePathArr.map((data:any)=> {
    // console.log(data)
    polylinePath.push(data)
  })
  // console.log(polylinePath)

  // 지도
  useEffect(()=>{
    let trafficLayer = new naver.maps.TrafficLayer({
      interval: 300000 // 5분마다 새로고침 (최소값 5분)
    });
    mapRef.current = new naver.maps.Map("map", {
      // center: new naver.maps.LatLng(location.latitude, location.longitude),
      center: new naver.maps.LatLng(36.34925,127.377575),
      zoom:17,
      mapTypeControl: true,
      zoomControl: true,  
    });
    console.log(mapRef.current)
    trafficLayer.setMap(mapRef.current)

    naver.maps.Event.once(mapRef.current,"init",(e)=>{
      trafficLayer.setMap(mapRef.current)
    })
  },[mapRef])
  //현재위치 마커 
  useEffect(()=> {
    // if(typeof location !== "string"){
      const currentPosition = [location.latitude, location.longitude];
      //마커관련
      markRef.current = new naver.maps.Marker({
        position : new naver.maps.LatLng(currentPosition[0],currentPosition[1]),
        map : mapRef.current,
        //아이콘 커스텀
        icon: {
          url: "https://mblogthumb-phinf.pstatic.net/MjAyMTA4MDRfMjk0/MDAxNjI4MDg2MDEwNTY4.TTh8QJAkzwBZZpKSw8OpIK83JQ8dBBI5qBu9uWvgrKUg.X2keaCQ5fJkyx05OOlVYwKPi3ynq0_oqHv-UFqLyGsQg.PNG.cha-cha97/%EC%B6%98%EC%8B%9D%EC%9D%B4%EF%BC%BF001.png?type=w800", 
          scaledSize : new naver.maps.Size(80,80),
        }
      })
      //마커 마우스 호버
      naver.maps.Event.addListener(markRef.current,"mouseover"
      ,(e)=>{
        console.log(e)
        console.log("마우스올림")
      })
      //마커 마우스 탈출 
      naver.maps.Event.addListener(markRef.current,"mouseout"
      ,(e)=>{
        // console.log(e)
        console.log("마우스빠짐")
      })
    // }
  },[location])
  
  useEffect(() => {
    if (typeof location !== "string") {
        //클릭한 위치에 마커 생성
      naver.maps.Event.addListener(mapRef.current,"click",(e)=> {
        // console.log(e)
        let infoWindow = new naver.maps.InfoWindow({
          content: [
            '<div class="iw_inner">',
            `<h2>선택한 좌표값</h2>`,
            `<p>${e.coord._lat}<br>
            ${e.coord._lng}`,
            '</p>',
            '</div>'
          ].join('')
        });
        let newMarker = new naver.maps.Marker({
          position:e.coord,
          map:mapRef.current
        })
        if(infoWindow.getMap()) {
          infoWindow.close()
        } else {
          infoWindow.open(mapRef.current,newMarker)
          console.log(infoWindow)
        }
      })
    }
  }, [location]);
    return (
      <div id='rootBg'>
      <p>현재위치</p>
      <p>주소: {home}</p>
      <p>위도: {location.latitude}</p>
      <p>경도: {location.longitude}</p>
      <div id="map"></div>
    </div>
  )
}

export default Map