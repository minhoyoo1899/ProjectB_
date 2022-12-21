//필요한 명세
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mysql = require("mysql");
const dotenv = require("dotenv"); // .env 설정 추가
dotenv.config();

//네이버 api 키
// const id = "rw8kfxnmol"
// const secret = "KLcIjNMP9IXvoxSEQmdcNjip3b5oj0agPyQmIQ30"

// console.log(dotenv);
// console.log(process.env);
// console.log(process.env.naverMapApi);

// console.log(htmlWebpackPlugin.options.env.naverMapApi);
// console.log(htmlWebpackPlugin.options.env.naverMapSecret);

const dbconfig = {
  host: "localhost",
  user: "root",
  password: "password",
  port: "3306",
  database: "hi_five",
};

const ymhApi = "jio9z2ehit";
const ymhSecret = "Jw5fmhG87nt4HglEw8FGpOPrdRuLXzY3FsCkfGqq";

const conn = mysql.createConnection(dbconfig);

//집주소
const address = "대전 서구 대덕대로 182";

//api 요청시 헤더에 넣을 기본 정보
const header = {
  "X-NCP-APIGW-API-KEY-ID": ymhApi,
  "X-NCP-APIGW-API-KEY": ymhSecret,
};
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// 입력한 주소의 좌표등 기본값 요청
app.get("/", async (req, res) => {
  try {
    let result = await axios({
      method: "get",
      // url : `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`,
      url: "https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=127.392416,36.343457&goal=127.377575,36.34925&cartype=4",
      headers: header,
    });

    const resultMsg = result.data;
    console.log(typeof resultMsg)    
    res.send(resultMsg);
  } catch (err) {
    console.log(err);
  }
});

app.get("/db", async (req, res) => {
  conn.query("SELECT * FROM test_table;", (error, rows) => {
    if (error) throw error;
    // console.log(rows);
    // console.log(typeof rows);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(`데이터 테스트 : ${rows}`);
  });
});

app.get("/direction15", async (req, res) => { 
  try {
    const result = await axios({
      method: "get",
      url: "https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=127.377579,36.349252&goal=127.408952,36.321161&waypoint=127.325118,36.300500",
      headers: header,
    })
    const resultMsg = result.data;
  } catch (err) {
    console.log(err);
  }
});


//네이버 api 키
// const id = "rw8kfxnmol"
// const secret = "KLcIjNMP9IXvoxSEQmdcNjip3b5oj0agPyQmIQ30"
// //집주소
// const address = "대전 서구 도솔로434-8"
// //api 요청시 헤더에 넣을 기본 정보
// const header = {
// "X-NCP-APIGW-API-KEY-ID" : id,
// "X-NCP-APIGW-API-KEY" : secret
// }
// 현재위치 좌표값 받아와서 지도에 마커표시
// 파일 분리를 안해서 좀 지저분 합니다...
app.get("/apiMap", async (req, res) => {
  try {
    res.send(
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script type="text/javascript"
      src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${encodeURI(ymhApi)
    }"></script>
      </head>
      <body>
      <div id="map" style="width:100%; height:800px;"></div>
      <script>
      //기본옵션(실행시에 삭제)
      var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
      };
      function success(pos) {
      var crd = pos.coords;
      console.log('현재위치');
      console.log('위도 : ' + crd.latitude);
      console.log('경도: ' + crd.longitude);
      // console.log('오차범위 ' + crd.accuracy + ‘m’);
      //지도 그릴 div
      let map = new naver.maps.Map(document.getElementById('map'), {
      center: new naver.maps.LatLng(crd.latitude, crd.longitude),
      //확대값 옵션(실행시에 삭제)
      zoom: 15
      });
      //마커 표시
      let marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(crd.latitude, crd.longitude),
      map: map
      });
      };
      function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
      };
      navigator.geolocation.getCurrentPosition(success, error, options);
      </script>
      </body>
      </html>
      `
    );
  } catch (err) {
    console.log(err);
  }
});


// 입력한 주소의 좌표등 기본값 요청
// app.get("/home", async(req,res)=> {
// try {
// let result = await axios({
// method : "get",
// url :
// `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`,
// headers: header
// });
// const resultMsg = result.data
// // console.log(resultMsg)
// res.send(resultMsg)
// }catch(err){
// console.log(err)
// }
// })
// 출발지와 도착지의 좌표값을 요청하여 목적지까지의 경로 요청
// 해당 부분과 지도에 오버레이하여 표기하는 것을 찾으면 출발지와 도착지 까지의 경로를 지도위에 표기할수 있을듯 함
// app.get("/wayhome", async(req,res)=> {
// try {
// let result = await axios({
// method : "get",
// url :
// `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=127.392362
// 2,36.3434230&goal=127.3776464,36.3493567&option=trafast`,
// headers: header
// });
// const resultMsg = result.data.route.trafast[0].guide
// console.log(resultMsg)
// res.send(resultMsg)
// }catch(err){
// console.log(err)
// }
// })

app.listen(8282, () => {
  console.log("server on port : 8282");
});
