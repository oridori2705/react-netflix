import React from 'react'
import requests from '../../api/requests';
import Banner from '../../components/Banner';
import Row from '../../components/Row';

export default function MainPage() {
  return (
    <div>
        <Banner/>

        <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals} //미리 만들어준 requests
        isLargeRow

        />

        <Row
        title="Trending Now"
        id="TN"
        fetchUrl={requests.fetchTrendng}
        />
        <Row
        title="Top Rated"
        id="TR"
        fetchUrl={requests.fetchTopRated}
        />
        <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
        />
        <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
        />
    </div>
  )
}
