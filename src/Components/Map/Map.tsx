import { useEffect, useState } from "react";
import axios from "axios";

const Map = () => {
  const [Data, setData] = useState([]);

  const MapData = async () => {
    try {
      setData([]);
      const res = await axios.get(`http://localhost:8282/apiMap`);
      setData(res.data);
      console.log(Data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    MapData();
  }, []);

  return (
    <div>
      {Data}
    </div>
    );
}


export default Map;