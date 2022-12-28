//필요한 명세
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mysql = require("mysql");
const dotenv = require("dotenv"); // .env 설정 추가
const convert = require("xml-js");
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
  password: "1111",
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
    });
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
      src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${encodeURI(
        ymhApi
      )}"></script>
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
    console.log("apiMap err");
  }
});
// 네이버 검색 api 사용
app.get(`/search/:name`, async (req, res) => {
  try {
    const searchResult = await axios({
      method: "get",
      url: `https://openapi.naver.com/v1/search/local.json?query=${req.params.name}&display=10&start=1&sort=random`,
      headers: {
        "X-Naver-Client-Id": "ZGE54oYQtkC7mL5htQ71",
        "X-Naver-Client-Secret": "RZIX1BycPn",
      },
    });
    const searchData = searchResult.data.items;
    res.send(searchData);
  } catch (err) {
    console.log(err);
  }
});
app.get("/event", async (req, res) => {
  try {
    let eventResult = await axios({
      method: "get",
      url: `https://openapi.its.go.kr:9443/eventInfo?apiKey=006a4eca1c784284a64eca250f68063c&type=all&eventType=all&minX=127.234227&maxX=127.570949&minY=36.192958 &maxY=36.488949&getType=json`,
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
      url: "https://openapi.its.go.kr:9443/cctvInfo?apiKey=4537498ac13e4a3a9e10f66e3984c96a&type=ex&cctvType=2&minX=127.234227&maxX=127.570949&minY=36.192958&maxY=36.488949&getType=json",
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

app.post("/activePath", async (req, res) => {
  const datas = req.body.way;
  // console.log(datas)
  let count = 0;
  let pathArr = [];
  for (let i = 0; i < datas.length / 2; i++) {
    pathArr.push([datas[count], datas[count + 1]]);
    count = count + 2;
  }
  // console.log(pathArr)

  let jsonArr = [];
  function linkData(arr) {
    new Promise((resolve, reject) => {
      let data = arr.map((el, index) => {
        // console.log(el)
        conn.query(
          `SELECT LINK_ID from daejeon_link where F_NODE = ${pathArr[index][0]} AND T_NODE = ${pathArr[index][1]}`,
          (err, row, fields) => {
            if (err) throw err;
            jsonArr.push(row);
            if (index === arr.length - 1) {
              resolve(jsonArr);
            }
          }
        );
      });
    })
      .then((res) => res)
      .then((data) => {
        res.send(data);
      });
  }
  linkData(pathArr);
});

app.post("/linkData", async (req, res) => {
  // console.log(req.body.data)
  let selectdLink = req.body.data;
  console.log(selectdLink);
  let consgestionArr = [];
  function congestionData(arr) {
    new Promise((resolve, reject) => {
      let data = arr.map((el, index) => {
        // console.log(el)
        conn.query(
          `SELECT congestion from daejeon_road where linkID = ${selectdLink[index]}`,
          (err, row, fields) => {
            if (err) throw err;
            // console.log(row)
            consgestionArr.push(row);
            if (consgestionArr.length === arr.length) {
              resolve(consgestionArr);
            }
          }
        );
      });
    })
      .then((res) => res)
      .then((data) => {
        res.send(data);
      });
  }
  congestionData(selectdLink);
});

app.post("/mouseover", async (req, res) => {
  // console.log(req.body.data)
  let activeLink = req.body.node;
  console.log(activeLink);
  try {
    let activeLinkResult = await axios({
      method: "get",
      url: `http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfo.do?linkId=${activeLink}&ServiceKey=1fBa1MM3xBTQkcg0xPlEQqd4JEkxWAqfUlMr/8ak3zBXUPHau8gPpxRkoWLURTNOt/PPKYm5g9KrCGbVs1ohAw==&numOfRows=1&pageNo=1`,
    });
    const xml2json = convert.xml2json(activeLinkResult.data, {
      compact: true,
      spaces: 4,
    });
    res.send(xml2json);
  } catch (err) {
    console.log(err);
  }
});

function gap(obj1, obj2) {
  let Xgap = obj1.node_Xcode - obj2.node_Xcode;
  let Ygap = obj1.node_Ycode - obj2.node_Ycode;
  return Xgap ** 2 + Ygap ** 2;
}

app.post("/navigation", (req, response) => {
  let timeStart = new Date();
  const start = req.body.start;
  const end = req.body.end;
  const node = [
    {
      node_id: start.node_id,
      length: 0,
      path: [start.node_id],
      link_path: [],
    },
  ];
  const completeNode = [];
  let count = 0;
  function find(arr) {
    new Promise((resolve, reject) => {
      let nodeArr = [];
      let nodeIdArr = [];
      arr.map((item, index) => {
        count++;
        conn.query(
          `SELECT T_NODE,LENGTH,LINK_ID from daejeon_link where F_NODE = ${item.node_id}`,
          (err, row, fields) => {
            if (err) throw err;
            let path = item.path;
            let filterRow = row.filter((rowItem) => {
              return path.indexOf(rowItem.T_NODE) < 0;
            });
            filterRow = row.filter((rowItem) => {
              return completeNode.indexOf(rowItem.T_NODE) < 0;
            });
            //내가 지나온 node는 제외
            filterRow.map((rowItem) => {
              let obj = {
                node_id: rowItem.T_NODE,
                length: item.length + rowItem.LENGTH,
                path: [...item.path],
                link_path: [...item.link_path],
              };
              if (nodeIdArr.indexOf(obj.node_id) < 0) {
                obj.path.push(obj.node_id);
                obj.link_path.push(rowItem.LINK_ID);
                nodeArr.push(obj);
                nodeIdArr.push(obj.node_id);
                // 존재하지않는 node_id라면 push
              } else {
                let index = nodeIdArr.indexOf(obj.node_id);
                if (nodeArr[index].length > obj.length) {
                  obj.path.push(obj.node_id);
                  obj.link_path.push(rowItem.LINK_ID);
                  // nodeArr.push(obj);
                  // nodeIdArr.push(obj.node_id);
                  // 기존 값을 변경해야하는데 push를 해서 새로 만들어서 값이 많아지는 오류가 있었음.
                  nodeArr[index] = obj;
                }
                // 존재하는 node_id라면 원래값보다 더 작으면 변경
              }
            });
            if (index + 1 === arr.length) {
              resolve(nodeArr);
              let minLength = 99999;
              nodeArr.map((item) => {
                if (minLength > item.length) {
                  minLength = item.length;
                }
              });
              node.push(...nodeArr);
              node.map((item) => {
                if (item.length <= minLength) {
                  completeNode.push(item.node_id);
                }
              });
            }
          }
        );
      });
    }).then((res) => {
      let test = res.filter((item) => {
        return item.node_id === end.node_id;
      });
      if (test.length === 0) {
        find(res);
      } else {
        new Promise((resolve, reject) => {
          let nodeData = [];
          test[0].path.map((item, index) => {
            conn.query(
              `SELECT * from daejeon_node where node_id = ${item}`,
              (err, row, fields) => {
                if (err) throw err;
                nodeData.push(row[0]);
                if (index + 1 === test[0].path.length) {
                  test[0].pathNode = nodeData;
                  resolve(test[0]);
                }
              }
            );
          });
        }).then((res) => {
          // console.log(arr);
          // console.log(completeNode);
          let timeEnd = new Date();
          res.time = timeEnd - timeStart;
          console.log(`${timeEnd - timeStart}ms`);
          console.log(`함수 반복 : ${count}회`);
          let json = JSON.stringify(res);
          response.writeHead(200, {
            "Content-Type": "text/json;charset=utf-8",
          });
          response.end(json);
        });
      }
    });
  }
  find(node);
});
app.post("/nearNode", (req, res) => {
  const data = req.body;
  // console.log(data);
  // let json = JSON.stringify(data);
  // res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
  // res.end(json);
  const Node = [
    {
      node_Xcode: Number(data.start.x),
      node_Ycode: Number(data.start.y),
    },
    {
      node_Xcode: Number(data.end.x),
      node_Ycode: Number(data.end.y),
    },
  ];
  let resData = [];
  Node.map((nodeItem, index) => {
    conn.query(
      `SELECT * from daejeon_node where
      node_Xcode > ${nodeItem.node_Xcode - 0.01} and
      node_Xcode < ${nodeItem.node_Xcode + 0.01} and
      node_Ycode > ${nodeItem.node_Ycode - 0.01} and
      node_Ycode < ${nodeItem.node_Ycode + 0.01}`,
      (err, row, fields) => {
        if (err) throw err;
        let nearNode = "";
        row.map((item) => {
          item.gap = gap(nodeItem, item);
          if (nearNode === "") {
            nearNode = item;
          } else if (nearNode.gap > item.gap) {
            nearNode = item;
          }
        });
        resData.push(nearNode);
        if (index === 1) {
          let json = JSON.stringify(resData);
          res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
          res.end(json);
        }
      }
    );
  });
});
app.listen(8282, () => {
  console.log("server on port : 8282");
});
