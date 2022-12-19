import { useEffect, useState } from "react";
import express from "express";
import axios from "axios";
import cors from 'cors';
console.log(cors);

const Minho = () => {
  axios.defaults.withCredentials = true;
  const address = "대전 서구 대덕대로 182";
  const header = {
    "X-NCP-APIGW-API-KEY-ID": process.env.naverMapApi,
    "X-NCP-APIGW-API-KEY": process.env.naverMapSecret, 
    withCredentials: true,    
  };
  const [Data, setData] = useState([]);
  // const app = express();
  // app.use(
  //   cors({
  //     origin: "*",
  //   })
  // );

  const apiDat = async () => {
    setData([]);
    try {
      setData([]);
      const resonse = await axios({
        method: 'GET',
        url: "https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=127.392416,36.343457&goal=127.377575,36.34925&cartype=4",
        headers: header
      });

      const resultMsg = resonse.data;
      setData(resonse.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    apiDat();
  }, []);


  return (
    <div>
      <p>naverMapApi: {process.env.naverMapApi}</p>
      <p>naverMapSecret: {process.env.naverMapSecret}</p>      
    </div>
  );
};

export default Minho;
