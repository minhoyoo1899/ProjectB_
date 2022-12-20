import { useState, useEffect } from 'react';
import styled from 'styled-components'

import {TiWeatherSunny, TiWeatherPartlySunny, TiWeatherCloudy} from 'react-icons/ti'

const Weather = () => {
  const week = ['일','월','화','수','목','금','토']
  const SKYdata = ['0','맑음','2','구름 많음','흐림']
  //SKY로 받아오는 값 1: 맑음 3: 구름많음 4: 흐림
  const [DateText, setDateText] = useState('') //오늘 날짜
  const [SKY, setSKY] = useState('loading..') //구름 상태
  const [TMX, setTMX] = useState('') //최고기온
  const [TMN, setTMN] = useState('') //최저기온
  const [IMG, setIMG] = useState('') //이미지

  useEffect(()=>{
    let today = new Date()
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    //오늘과 어제 날짜 구하기
    let todayText = `${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`
    let yesterdayText = `${yesterday.getFullYear()}${yesterday.getMonth()+1}${yesterday.getDate()}`
    //오늘과 어제 날짜 8자리 text로 바꾸기
    setDateText(`${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 [${week[today.getDay()]}]`)
    //오늘 날짜 text
    let timeText = `0${today.getHours()}00`.slice(-4);
    //현재 시각 text
    let serviceKey = 'V7OxcW%2F080Fdwrj0pJIRnO%2FcTyn%2FGt4LuDb5FMAycSMwmAGQ1uk3TkqjIpf0UiQTVgrnsRjf9%2FPgbEsl2r4avw%3D%3D';
    let nx = '32'//위도
    let ny = '126'//경도
    let baseTime = '0200' // 새벽 2시부터 3시간 단위로 제공.
    fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&numOfRows=700&base_date=${yesterdayText}&base_time=${baseTime}&nx=${nx}&ny=${ny}&dataType=JSON`)
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      let a = res.response.body.items.item
      a.map((item:any)=>{
        if(item.category === 'TMX' && item.fcstDate === todayText){
          setTMX(`${Number(item.fcstValue)}`)
          console.log(item.fcstValue)
        }
        if(item.category === 'TMN' && item.fcstDate === todayText){
          setTMN(`${Number(item.fcstValue)}`)
          console.log(item.fcstValue)
        }
        if(item.category === 'SKY' && item.fcstDate === todayText && item.fcstTime === timeText){
          setSKY(`${SKYdata[item.fcstValue]} (${today.getHours()}시 00분 기준)`)
          setIMG(item.fcstValue)
        }
      })
    })
  },[])
  return (
    <Container>
      <Home>
        <img src="img/logo.png"/>
      </Home>
      <WeatherBox>
        <TextBox>
          <div>
            <p>{DateText}</p>
          </div>
          <div>
            <p>{SKY}</p>
            <p>최고: {TMX}°C 최저: {TMN}°C</p>
          </div>
        </TextBox>
        <ImgBox>
        {
          IMG === '1' && <TiWeatherSunny/>
        }
        {
          IMG === '3' && <TiWeatherPartlySunny/>
        }
        {
          IMG === '4' && <TiWeatherCloudy/>
        }
        </ImgBox>
      </WeatherBox>
    </Container>
  );
}

const Container = styled.div`
  width:250px;
  height:150px;
  position: absolute;
  z-index: 1;
  top: 2%;
  border-radius: 10px 10px 2px 2px;
  overflow: hidden;
`

const Home = styled.div`
  width:250px;
  height:45px;
  background-color: #fff;
  display:flex;
  align-items:center;
  padding:20px;
  >img{
    width:80px;
  }
`

const WeatherBox = styled.div`
  width: 250px;
  height: 105px;
  background-color: rgba(160,160,160,0.4);
  display:flex;
  backdrop-filter: blur(10px);
  padding-left: 12px;
  padding-right: 3px;
  justify-content:center;
  align-items: center;
`

const TextBox = styled.div`
  width: 70%;
  height: 60%;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  >div:nth-child(1){
    height: 50%;
    display: flex;
    flex-direction: column;
  }
  >div:nth-child(2){
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const ImgBox = styled.div`
  width: 40%;
  height: 80%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  >svg{
    width:80px;
    height: 80px;
  }
`

export default Weather;