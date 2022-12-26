//필요한 명세
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mysql = require("mysql");
const dotenv = require("dotenv"); // .env 설정 추가
const convert = require('xml-js');
const { response, json } = require("express");
const { link, cpSync } = require("fs");
const { resolve } = require("path");
dotenv.config();


const dbconfig = {
  host: "localhost",
  user: "root",
  password: "61910923",
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

app.use(express.json());

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
    console.log(typeof resultMsg);
    res.send(resultMsg);
  } catch (err) {
    console.log(err);
  }
});

// app.get("/db", async (req, res) => {
//   conn.query("SELECT * FROM test_table;", (error, rows) => {
//     if (error) throw error;
//     // console.log(rows);
//     // console.log(typeof rows);
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/html; charset=utf-8");
//     res.end(`데이터 테스트 : ${rows}`);
//   });
// });

// app.get("/direction15", async (req, res) => {
//   try {
//     const result = await axios({
//       method: "get",
//       url: "https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=127.377579,36.349252&goal=127.408952,36.321161&waypoint=127.325118,36.300500",
//       headers: header,
//     });
//     const resultMsg = result.data;
//   } catch (err) {
//     console.log(err);
//   }
// });



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

// 네이버 검색 api 사용
app.get(`/search/:name`,async(req,res)=>{
  try{
    const searchResult = await axios({
      method:"get",
      url:`https://openapi.naver.com/v1/search/local.json?query=${req.params.name}&display=10&start=1&sort=random`,
      headers:{
        "X-Naver-Client-Id":"ZGE54oYQtkC7mL5htQ71",
          "X-Naver-Client-Secret":"RZIX1BycPn"
      }
    });
    const searchData = searchResult.data.items;
    res.send(searchData)
  }catch(err){
    console.log(err)
  }
  
})



app.get("/event",async(req,res)=>{
  try{
    let eventResult = await axios({
      method : "get",
      url: `https://openapi.its.go.kr:9443/eventInfo?apiKey=006a4eca1c784284a64eca250f68063c&type=all&eventType=all&minX=127.234227&maxX=127.570949&minY=36.192958 &maxY=36.488949&getType=json`
    });
    const eventData = eventResult.data.body.items;
    res.send(eventData);
  } catch (err) {
    console.log(err);
    console.log("event err");
  }
});


app.get("/cctv", async (req, res) => {
  try {
    let cctvResult = await axios({
      method: "get",
      url: "https://openapi.its.go.kr:9443/cctvInfo?apiKey=006a4eca1c784284a64eca250f68063c&type=ex&cctvType=2&minX=127.234227&maxX=127.570949&minY=36.192958&maxY=36.488949&getType=json",
    });
    const cctvMsg = cctvResult.data;
    // console.log(cctvMsg)
    res.send(cctvMsg);
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

app.get("/deajeonNode", async (req, res) => {
  conn.query(`SELECT * from daejeon_node`, (err, row, fields) => {
    if (err) throw err;
    let json = JSON.stringify(row);
    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
    res.end(json);
  });
});

app.post("/activePath", async(req,res)=>{
  const datas = req.body.way
  // console.log(datas)
  let count = 0
  let pathArr = []
  for(let i = 0; i<datas.length/2; i++){
    pathArr.push([datas[count],datas[count+1]])
    count= count+2
  }
  // console.log(pathArr)

  let jsonArr = []
  function linkData(arr) {

    new Promise((resolve,reject)=>{
        let data = arr.map((el,index)=>{
          // console.log(el)
        conn.query(
          `SELECT LINK_ID from daejeon_link where F_NODE = ${pathArr[index][0]} AND T_NODE = ${pathArr[index][1]}`, 
          (err, row, fields) => {
            if (err) throw err;
            jsonArr.push(row)
            if(index === arr.length-1){
              resolve(jsonArr)
            }
          });
        })
      })
      .then((res)=>res)
      .then ((data)=>{
        res.send(data)
      })
  }
  linkData(pathArr)
})

app.post('/linkData', async(req,res)=>{
  // console.log(req.body.data)
  let selectdLink = req.body.data
  console.log(selectdLink)
  let consgestionArr = []
  function congestionData(arr) {
    new Promise((resolve,reject)=>{
        let data = arr.map((el,index)=>{
          // console.log(el)
        conn.query(
          `SELECT congestion from daejeon_road where linkID = ${selectdLink[index]}`, 
          (err, row, fields) => {
            if (err) throw err;
            // console.log(row)
            consgestionArr.push(row)
            if(consgestionArr.length === arr.length){
              resolve(consgestionArr)
            }
          });
        })
      })
      .then((res)=>res)
      .then ((data)=>{
        res.send(data)
      })
  }
  congestionData(selectdLink)
})

app.post('/mouseover', async(req,res)=>{
  // console.log(req.body.data)
  let activeLink = req.body.node
  console.log(activeLink)
  try {
    let activeLinkResult = await axios({
      method: "get",
      url: `http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfo.do?linkId=${activeLink}&ServiceKey=1fBa1MM3xBTQkcg0xPlEQqd4JEkxWAqfUlMr/8ak3zBXUPHau8gPpxRkoWLURTNOt/PPKYm5g9KrCGbVs1ohAw==&numOfRows=1&pageNo=1`,
    });
    const xml2json = convert.xml2json((activeLinkResult.data),{compact:true, spaces:4})
    res.send(xml2json);
  } catch (err) {
    console.log(err);
  }
})

// let activeLinkdata = await axios({
//   method : "get",
//   url: `http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?ServiceKey=1fBa1MM3xBTQkcg0xPlEQqd4JEkxWAqfUlMr/8ak3zBXUPHau8gPpxRkoWLURTNOt/PPKYm5g9KrCGbVs1ohAw==&numOfRows=5&pageNo=1`
// });
// // console.log(activeLinkdata.data)
// const xml2json = convert.xml2json((activeLinkdata.data),{compact:true, spaces:4})
// // console.log(xml2json)
// res.send(xml2json)
  // conn.query(
  //   `SELECT congestion,linkLength, from daejeon_road where linkID = ${activeLink}`, 
  //   (err, row, fields) => {
  //     if (err) throw err;
  //     // console.log(row)
  //     consgestionArr.push(row)
  //     if(consgestionArr.length === arr.length){
  //       resolve(consgestionArr)
  //     }
  //   });
  //     res.send(data)
  // // activeLinkData(selectdLink)




app.post("/navigation", (req, response) => {
  const start = req.body.start;
  const end = req.body.end;

  function gap(obj1, obj2) {
    let Xgap = obj1.node_Xcode - obj2.node_Xcode;
    let Ygap = obj1.node_Ycode - obj2.node_Ycode;
    return Xgap ** 2 + Ygap ** 2;
  }

  function navi(naviStart, naviEnd) {
    let route = [naviStart];
    const notNode = [];
    let count = 0;
    function find(start, end) {
      count++;
      let routeNode = route.map((item) => {
        return item.node_id;
      });
      new Promise((resolve, reject) => {
        conn.query(
          `SELECT T_NODE from daejeon_link where F_NODE = ${start.node_id}`,
          (err, row, fields) => {
            if (err) throw err;
            let filter = row.filter((item) => {
              return (
                notNode.indexOf(item.T_NODE) < 0 &&
                routeNode.indexOf(item.T_NODE) < 0
              );
            });
            // console.log(filter);
            // console.log(count);
            //notNode에 있는 node는 제외하고 탐색.
            if (route.length > 0 && filter.length === 0) {
              //시작지점이 아닌데 막다른길
              notNode.push(route[route.length - 1].node_id);
              //notNode에 현재 위치노드 추가,
              route = [naviStart];
              //route에 마지막 요소 제거
              // find(route[route.length - 1], end);
              find(naviStart, end);
              //그 이전부터 다시 시작
            } else {
              resolve(filter);
            }
          }
        );
      }).then((res) => {
        // console.log(res);
        let node = "";
        new Promise((resolve, reject) => {
          res.map((item, index) => {
            // console.log(item.T_NODE);
            conn.query(
              `SELECT * from daejeon_node where node_id = ${item.T_NODE}`,
              (err, row, fields) => {
                if (err) throw err;
                let data = row[0];
                data.gap = gap(data, end);
                if (node.length === 0) {
                  node = data;
                } else if (data.gap < node.gap) {
                  node = data;
                }
                if (index === res.length - 1) {
                  resolve(node);
                }
              }
            );
          });
        }).then((res) => {
          route.push(res);
          if (res.node_id === end.node_id || count > 500) {
            let json = JSON.stringify(route);
            response.writeHead(200, {
              "Content-Type": "text/json;charset=utf-8",
            });
            response.end(json);
          } else {
            find(res, end);
          }
        });
      });
    }
    find(naviStart, naviEnd);
  }
  navi(start, end);
});

app.listen(8282, () => {
  console.log("server on port : 8282");
});
