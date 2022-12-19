import { useEffect, useRef } from 'react';
import React from 'react';
import styled from 'styled-components';
import Side from './side';

function Main() {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);


  return (
    <Container>
      <Map ref={mapElement}>
      <Side/>
      </Map>
    </Container>
  )
}


export default Main;

const Container = styled.div`
  width:100vw;
  height:100vh;
`

const Map = styled.div`
  width:100vw;
  height:100vh;
  padding:1%;
`