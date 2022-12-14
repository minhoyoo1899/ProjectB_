import { useState, useEffect } from 'react';
import styled from 'styled-components'

import {TiWeatherSunny, TiWeatherPartlySunny, TiWeatherCloudy, TiWeatherSnow, TiWeatherShower} from 'react-icons/ti'

const Weather = (props:any) => {
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
    let nx = String(props.props.centerY).split('.')[0] //위도
    let ny = String(props.props.centerX).split('.')[0] //경도
    let baseTime = '0200' // 새벽 2시부터 3시간 단위로 제공.
    fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&numOfRows=700&base_date=${yesterdayText}&base_time=${baseTime}&nx=${nx}&ny=${ny}&dataType=JSON`)
    .then((res)=>res.json())
    .then((res)=>{
      let data = res.response.body.items.item
      data.map((item:any)=>{
        if(item.category === 'TMX' && item.fcstDate === todayText){
          setTMX(`${Number(item.fcstValue)}`)
        }
        //최고기온 구하기
        if(item.category === 'TMN' && item.fcstDate === todayText){
          setTMN(`${Number(item.fcstValue)}`)
        }
        //최저기온 구하기
        if(item.category === 'SKY' && item.fcstDate === todayText && item.fcstTime === timeText){
          setSKY(`${SKYdata[item.fcstValue]} (${timeText.slice(0,2)}시 00분 기준)`)
          setIMG(item.fcstValue)
        }
        //날씨 구하기(맑음, 구름많음, 흐림)
        if(item.category === 'PTY' && item.fcstDate === todayText && item.fcstTime === timeText){
          // 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
          if(item.fcstValue === '1' || item.fcstValue === '2'|| item.fcstValue === '4'){
            setIMG('RAIN')
          }
          if(item.fcstValue === '3'){
            setIMG('SNOW')
          }
        }
        //비나 눈 오는지 구하기
      })
    })
  },[props])
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
        {
          IMG === 'RAIN' && <TiWeatherShower/>
        }
        {
          IMG === 'SNOW' && <TiWeatherSnow/>
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
  background-color: rgba(30,30,30,0.4);
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
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  >div:nth-child(1){
    font-size: 0.8rem;
    height: 50%;
    display: flex;
    flex-direction: column;
  }
  >div:nth-child(2){
    font-size: 0.7rem;
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