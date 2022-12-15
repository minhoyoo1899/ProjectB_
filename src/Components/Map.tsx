import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import axios from "axios"
import "../CSS/map.css"

function Map() {
  //현위치 마커
  const markRef = useRef<any>()
  //출발지 마커 
  const startMarkRef = useRef<any>()
  //경유지 마커 
  const layMarkkRef = useRef<any>()
  //도착지 마커
  const endMarkRef = useRef<any>()

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
  const [wayData, setWayData] = useState<any>()
  
  //서버에 요청 
  useEffect(()=> {
    const getDatas = async()=>{
      const datas = await axios.get("http://localhost:6565/")
      const routePath = datas.data.route.traoptimal[0].path
      console.log(routePath)
      setRoutePathArr(routePath)
      setWayData(datas.data.route.traoptimal[0])
      // 출발지 좌표
      // console.log(datas.data.route.traoptimal[0].summary.start.location)
      startMarkRef.current = datas.data.route.traoptimal[0].summary.start.location
      // 경유지 좌표
      // console.log(datas.data.route.traoptimal[0].summary.waypoints[0].location)
      layMarkkRef.current = datas.data.route.traoptimal[0].summary.waypoints[0].location
      // 도착지 좌표
      // console.log(datas.data.route.traoptimal[0].summary.goal.location)
      endMarkRef.current = datas.data.route.traoptimal[0].summary.goal.location
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
  //경로 그리기용 path 담을 배열 
  let polylinePath:any[] = []

  routePathArr.map((pathdata:any)=> {
    // console.log(pathdata)
    polylinePath.push(new naver.maps.LatLng(pathdata[1],pathdata[0]));
  })
  
  const polyline = new naver.maps.Polyline({
    path: polylinePath, //좌표배열
    strokeColor: "#333", //선의 색 
    strokeOpacity: 1, //선의 투명도
    strokeWeight: 6, //선의 두께,
    clickable:true,
    map: mapRef.current, //만들어 놓은 지도
  })

  // console.log(polylinePath)
  naver.maps.Event.addListener(polyline,"mouseover",(e)=>{
    // console.log(wayData.summary.distance)
    const distance = (Math.floor(wayData.summary.distance/1000)+"KM")
    // console.log(distance)
    //마우스 오버시 보여줄 컨텐츠
    let distanceInfo = new naver.maps.InfoWindow({
      content: [
        '<div>',
        `<h3>전체 거리</h3>`,
        `<p>${distance}</p>`,
        '</div>'
      ].join('')
    });
    //마우스 오버한 위치에 마커 생성 
    let distanceMarker = new naver.maps.Marker({
      position:e.coord,
    })
    if(distanceInfo.getMap()) {
      distanceInfo.close()
    } else {
      distanceInfo.open(mapRef.current,distanceMarker)
      console.log(distanceInfo)
    }
  })

  // const lineMarker = new naver.maps.Marker({
  //   position : polylinePath[polylinePath.length-1],
  //   map: mapRef.current
  // })
  useEffect(()=>{
    startMarkRef.current = new naver.maps.Marker({
      position : new naver.maps.LatLng(startMarkRef.current),
      map : mapRef.current
    })
    layMarkkRef.current = new naver.maps.Marker({
      position : new naver.maps.LatLng(layMarkkRef.current),
      map : mapRef.current
    })
    endMarkRef.current = new naver.maps.Marker({
      position : new naver.maps.LatLng(endMarkRef.current),
      map : mapRef.current
    })
  })

  // 지도
  useEffect(()=>{
    let trafficLayer = new naver.maps.TrafficLayer({
      interval: 300000 // 5분마다 새로고침 (최소값 5분)
    });
    mapRef.current = new naver.maps.Map("map", {
      // center: new naver.maps.LatLng(location.latitude, location.longitude),
      center: new naver.maps.LatLng(36.34925,127.377575),
      zoom:15,
      mapTypeControl: true,
      zoomControl: true,  
    });
    // console.log(mapRef.current)
    trafficLayer.setMap(mapRef.current)

    naver.maps.Event.once(mapRef.current,"init",(e)=>{
      trafficLayer.setMap(mapRef.current)
    })
  },[mapRef])

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