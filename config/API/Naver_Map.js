//필요한 명세
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require("dotenv"); // .env 설정 추가

//네이버 api 키
// const id = "rw8kfxnmol"
// const secret = "KLcIjNMP9IXvoxSEQmdcNjip3b5oj0agPyQmIQ30"



//집주소
const address = "대전 서구 대덕대로 182"

//api 요청시 헤더에 넣을 기본 정보 
const header = {
  "X-NCP-APIGW-API-KEY-ID" :  process.env.naverMapApi,
  "X-NCP-APIGW-API-KEY" : process.env.naverMapSecret
}
const app = express()

app.use(cors({
  origin : '*'
}))

// 입력한 주소의 좌표등 기본값 요청 
app.get("/", async(req,res)=> {
  try {
    let result = await axios({
      method : "get",
      // url : `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`,
      url: "https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=127.392416,36.343457&goal=127.377575,36.34925&cartype=4",
      headers: header 
    });

    const resultMsg = result.data
    // console.log(resultMsg)
    res.send(resultMsg)
          
  }catch(err){
    console.log(err)
  }
})    

app.listen(6565, ()=> {
  console.log("server on")
})