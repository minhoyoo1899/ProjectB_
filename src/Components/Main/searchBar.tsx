import styled from "styled-components"
import {useState,useEffect} from "react"
import { addressStore } from "../store/stateStore";


const SearchBar:React.FC = () => {

  //*출발지 목적지 검색하여 조회하는 검색창입니다.
  //1.검색창 입력값은 firstSearch로 관리됨.
  //2.출발지 검색창 입력후 Enter -> handleOnKeyPress 작동
  // search 라우터의 검색 api로 데이터를 조회하여 firstAddress에 저장함
  //3.firstAddress가 변경되면 검색창 아래에 리스트 출력하고 선택하면
  // 검색창에 해당 실주소가 입력됨.
  // 목적지 입력창도 같은 방식


  //출발지 검색어 저장
  const [firstSearch,setFirstSearch] = useState('');
  const firstSearchChange = (e:any) =>{
    setFirstSearch(e.target.value);
  }
  const [firstAddress,setFirstAddress] = useState([])

//목적지 검색어 저장
  const [secondSearch,setSecondSearch] = useState('');  
  const secondSearchChange = (e:any) =>{
    setSecondSearch(e.target.value);
  }
  
  const [secondAddress,setSecondAddress] = useState([])
  

  //검색어 입력시 데이터 조회
  useEffect(()=>{
    setFirstAddress(firstAddress)
    setSecondAddress(secondAddress)
  },[])

  const handleOnKeyPress = (e:any,name:any,type:any) => {
    if (e.key === 'Enter') {
      //alert(name)
      fetch(`http://localhost:8282/search/${name}`,{
      headers:{
        "Content-Type": "application/json",
      }
    })
    .then((response)=>response.json())
    .then((response)=>{
      console.log(response)
      if(type === "first"){
        setFirstAddress(response)
        console.log(firstAddress,'test')
      }else if(type === "second"){
        setSecondAddress(response)
        console.log(secondAddress,'test')
      }
      
    }).catch((err)=>{
      console.log(err)
    })
    }

  };

  //찾기 버튼 눌렀을때 출발지,목적지를 배열로 저장, AddressStore로 값을 넘김
  function onSubmit(){
    let address = [firstSearch,secondSearch]
    
  let data:any = [];

    for(let i=0;i<address.length;i++){
        naver.maps.Service.geocode({
          query: address[i]
      }, function(status, response) {
          if (status !== naver.maps.Service.Status.OK) {
              return alert('Something wrong!');
          }

          let result = response.v2, // 검색 결과의 컨테이너
              items = result.addresses; // 검색 결과의 배열
          data.push(items[0])
          // do Something
      });
      
    }
  //console.log(data)

  addressStore.dispatch({type:"ADD",text:data})
  //console.log(address)
  }


  return(
    <>
    {/* //*출발지 입력 */}
      <Container>
        <Input type='text' placeholder="출발지 입력" value={firstSearch} onChange={firstSearchChange} onKeyDown={(e)=>{
          handleOnKeyPress(e,firstSearch,"first")
        }}/>
        
      </Container>
      {firstAddress.length !== 0 ?(
        <SearchList style={{top:'60px'}}>
        {
          firstAddress.map((item:any)=>{
            if(item.length !== 0){
              return(
                <div key={item.maxX} dangerouslySetInnerHTML={{__html:item.title}}
                  onClick={()=>{
                    console.log(item.address)
                    setFirstAddress([])
                    setFirstSearch(item.address)
                   // startStore.dispatch({type:"START",text:item.address})
                  }}
                />
               
              )
            }
            
          })
        }
      </SearchList>
      ):(null)}

      


      {/* //*목적지 입력 */}
      <Container>
        <Input type='text' placeholder="목적지 입력" value={secondSearch} onChange={secondSearchChange} onKeyDown={(e)=>{
          handleOnKeyPress(e,secondSearch,'second')
        }}/>
        
      </Container>
      {secondAddress.length !== 0 ?(
        <SearchList style={{top:"110px"}}>
        {
          secondAddress.map((item:any)=>{
            if(item.length !== 0){
              return(
                <div key={item.maxX} dangerouslySetInnerHTML={{__html:item.title}}
                  onClick={()=>{
                    console.log(item.address)
                    setSecondAddress([])
                    setSecondSearch(item.address)
                    //endStore.dispatch({type:'END',text:item.address})
                    
                  }}
                />
              )
            }
            
          })
        }
      </SearchList>
      ):(null)}
      <Button onClick={onSubmit}>찾기</Button>
    </>
  )
}

export default SearchBar;




const Container = styled.div`
  width:100%;
  height:40px;
  background-color:white;
  position:relative;
  z-index:1;

  box-shadow:0px 0px 10px gray;
  padding:10px;
  border-radius:2px;
  
`
const Input = styled.input`
  width:100%;
  height:100%;
  border:0;
  z-index:1;
  position:relative;
  :focus{outline:none};
`

const SearchList = styled.div`
  width:90%;
  height:max-content;
  padding:10px;
  background-color:white;
  position:absolute;
  z-index:2;
  //top:60px;
  box-shadow:0px 0px 10px gray;
  display:flex;
  flex-direction:column;
  gap:10px;
  font-size:.8em;

`

const Button = styled.button`
  widht:100px;
  height:40px;
  border:0;
  background-color:#0464ad;
  color:white;
  cursor:pointer;
  :hover{
    background-color:tomato
  }
`