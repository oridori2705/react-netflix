import axios from '../api/axios';
import React,{useState,useEffect} from 'react';
import './Row.css';
import MovieModal from './MovieModal';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({isLargeRow,fetchUrl,title,id}) {
    const [movieSelected, setMovieSelected] = useState({})
    const [modalOpen, setModalOpen] = useState(false);
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchMovieData();
        
    }, []);
    
    const fetchMovieData = async ()=>
    {
        const request = await axios.get(fetchUrl);//props로 가져온 각기 다른 url
        //console.log("request", request); request가 가져오는 값들 보여줌
        setMovies(request.data.results);
    };


    //이미지 클릭하면 살세정보 모달 오픈
    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

  return (
    <section className="row">
        <h2>{title}</h2>
        <Swiper 
        //spaceBetween={50} 슬라이드 사이 간격
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}

        loop={true} // loop 기능을 사용할 것인지

        breakpoints={{
          1378: { //우의 숫자가 사이즈별로 몇개의 슬라이드가 보일건지
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, //한번에 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation  // arrow 버튼 사용 유무 
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지 
        >
            <div id={id} className="row__posters">
                {movies.map((movie) => (//movies의 20개의 데이터를 나열하기위해 map 메소드 사용
                <SwiperSlide>
                    <img
                        key={movie.id} //key는 고유한값으로 지정
                        style={{ padding: "25px 0" }}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} // (`)조건 쓸 때, 큰 배너이미지와 작은 배너이미지 구분
                        src={`https://image.tmdb.org/t/p/original/${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                        } `} //src 앞부분은 앞서 배웠던 api의 중복되는 구조를 넣고, 뒤 다른경로를 넣는다.  
                        //조건은 큰 배너 이미지와 작은배너이지의 구분이다.
                        alt={movie.name} //alt를 넣어줘야 오류가 안뜬다. 
                        onClick={()=>handleClick(movie)}
                    />
                </SwiperSlide>
            ))}
            </div>
        </Swiper>  
            {//무비 모달 부분
                modalOpen &&(
                    <MovieModal 
                        {...movieSelected}
                        setModalOpen={setModalOpen} //모달을 열고 닫고 할수있게 props로 내려줌
                        />
                    
                )
            }
    </section>
  );
}
