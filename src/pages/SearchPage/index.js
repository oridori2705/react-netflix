
import React,{useEffect,useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from "../../api/axios";
import { useDebounce } from '../../hooks/useDebounce';
import "./SearchPage.css"

export default function SearchPage() {
  //위로 올려줘야함 useEffect가 아래로
  const navigate = useNavigate();

  const useQuery=()=>{
    return new URLSearchParams(useLocation().search);
  }
  let query= useQuery();
  const searchTerm = query.get("q");
  const debounceSearchTerm=useDebounce(query.get("q"),500);


  const [searchResults, setsearchResults] = useState([]);


  useEffect(() => {
    if(debounceSearchTerm) //serachterm이 있을때만 구동
    {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm])//searchTerm이 변할 때마다 fetchSearchMovie로 요청해주기 위해



  const fetchSearchMovie= async (searchTerm)=>{
    try{
      const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`) //성인영화는 제외하는 api포함
      setsearchResults(request.data.results);
    }
    catch(error){
      console.log("error",error);
    }
  }
  

  
  const renderSearchResults=()=>{
    return searchResults.length > 0 ?(
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path; //이미지url 가져옴
            return (
              <div className="movie" key={movie.id}/*key값을 넣어줘야함 */>
                <div
                  onClick={() => navigate(`/${movie.id}`)}//이미지 상세페이지 경로는 무비아이디로
                  className="movie__column-poster"
                >
                  <img
                    src={movieImageUrl} //이미지를 넣어줌
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section> //여기까지가 해당 검색 결과가 있을때 임
    ): (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자하는 검색어"{debounceSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  }
  return renderSearchResults(); //리턴값을 넣어줘야함 
}
