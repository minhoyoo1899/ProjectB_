//필요한 명세
const express = require('express');
const axios = require('axios');
const cors = require('cors');
//네이버 api 키 
const id = "rw8kfxnmol"
const secret = "KLcIjNMP9IXvoxSEQmdcNjip3b5oj0agPyQmIQ30"
//집주소
const address = "대전 서구 대덕대로 182"
//api 요청시 헤더에 넣을 기본 정보 
const header = {
  "X-NCP-APIGW-API-KEY-ID" :  id,
  "X-NCP-APIGW-API-KEY" : secret
}
const app = express()

const totalWay = {
  start:['127.392416','36.343457'],
  goal:['127.377575','36.34925'],
  waypoint:['127.398217','36.423233']// 현대아울렛
}

app.use(cors({
  origin : '*'
}))

// 입력한 주소의 좌표등 기본값 요청 
// 경로 :집>현대아울렛>학원
app.get("/", async(req,res)=> {
  try {
    let result = await axios({
      method : "get",
      // url : `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`,
      url: `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${totalWay.start[0]},${totalWay.start[1]}&goal=${totalWay.goal[0]},${totalWay.goal[1]}&waypoints=${totalWay.waypoint[0]},${totalWay.waypoint[1]}`,
      // url :"https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=127.392416,36.343457&goal=127.377575,36.34925&cartype=4&waypoints=127.398217,36.423233",
      headers: header 
    });

    const resultMsg = result.data
    // console.log(resultMsg)
    res.send(resultMsg)
          
  }catch(err){
    console.log(err)
  }
})    

// 포트 넘버는 네이버에 본인이 등록한 애플리케이션 주소로 변경  
app.listen(6565, ()=> {
  console.log("server on")
})