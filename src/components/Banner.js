import React,{useEffect,useState} from 'react'
import "./Banner.css"
import axios from "../api/axios"; //우리가 만든 axios.js를 사용해야함
import requests from '../api/requests';
import styled from "styled-components"; // styled 컴포넌트 사용하기

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false); //paly버튼을 눌렀을때 비디오가 나오게하는 변수 


    useEffect(() => {
        fetchData();
      }, []);
      //async, await 비동기 전송인데 동기전송으로 보이게 한다.
      const fetchData = async () => {
        // 현재 상영중인 영화 정보를 가져오기(여러 영화)
        //요청후 서버에서 처리하는 시간이 있으므로 기다려야하고  그 후에 정보들이 들어간다.
        //await를 지우게되면 기다리지않고 바로 가져와버려서pending처리가됨 
        //request에는 현재 20개의 영화정보가 들어가있다. 
        const request = await axios.get(requests.fetchNowPlaying);
    
        // 여러 영화 중 영화 하나의 ID를 가져오기
        const movieId =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)//request.data.results.length 전체 길이 = 20
          ].id;
    
        // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함) moviedetail안에 정보들이 들어감
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
          params: { append_to_response: "videos" },
        });
        setMovie(movieDetail);
      };

      
      //설명글 100자 이상이면 자른 후 ... 붙여주기
      const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      };
    if(!isClicked){
      //App.css 다 지워주기
      return (
        <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, //위에서 가져온 상세정보에서 영화 이미지 
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents"> 
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name /*영화제목*/}
          </h1>

          <div className="banner__buttons">
            <button /*Play버튼 */
              className="banner__button play"
              onClick={() => setIsClicked(true)}
              >
              Play
            </button>
            <button className="banner__button info" /*더많은 정보 버튼 */>
                More Information
            </button>
          </div>

          <h1 className="banner__description" /*영화 설명 */>
            {truncate(movie.overview, 100) /* */} 
          </h1>
        </div>
        <div className="banner--fadeBottom"/*스타일링하기위해 넣음 */ />
      </header>
      )
    }else {
      return (
        <Container>
          <HomeContainer>
            <Iframe //다른HTML페이지(유튜브)를 현재 페이지에 포함시키는 중첨브라우저
              width="640"
              height="360"
              //옵셔널 체이닝(?.)을 걸어 해당되는 videos가없으면 undefined 반환 후 동영상을 재생할 수 없다고 뜨게 한다. 두번째소스는 기본소스
              src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&playlist=${movie.videos.results[0]?.key}`} 
              //src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              title="YouTube video player"
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfullscreen
            ></Iframe>
          </HomeContainer>
        </Container>
      );
    }
    
}
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after { //
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
