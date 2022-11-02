import React,{useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import "./Nav.css"

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setsearchValue] = useState("")
  const navigate = useNavigate();



  //useEffect 리스너,위에서 useState처럼 가져와줘야 한다. - 리액트 HOOKS 부분이다. 마운트하고 업데이팅하고 언마운트하는 것을 한번에 처리해주는 useEffect
  useEffect(() => {
    window.addEventListener("scroll",()=>{ //스크롤할때 무엇을 할건지
      if(window.scrollY>50){ //스크롤을 내리면 내린 값을 뜻한다.
        setShow(true);
      }
      else{ 
        setShow(false);
      }
    })

    return () => { //이 컴포넌트를 안쓸때는 리스너 등록한것을 없애줘야한다.
      window.removeEventListener("scroll", () => {});
    }
  }, [])//디펜던시 부분 여기가 바뀌면 한번더 실행한다.
  
  const handleChange=(e)=>{
    setsearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`); //navigㅅㄷ를 통해 컴포넌트이동
  }

  return (
    <nav className={`nav ${show && "nav_black"} `} /*show가 true이면 nav_black을 className으로 가진다. 조건부 삼항연산자같은거임*/>
        <img
            alt='Netflix logo'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png"
            className='nav_logo'
            onClick={()=>window.location.reload()}
        />
        <input
          value={searchValue}  onChange={handleChange} className="nav_input" type="text"
          placeholder="영화를 검색해주세요"/>
        <img
            alt="User logged"
            src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            className='nav_avatar'
        />
    </nav>
  )
}
