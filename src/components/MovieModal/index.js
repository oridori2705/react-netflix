import React from 'react';
import'./MovieModal.css';
import { useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';

function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) {
  const ref= useRef();
  useOnClickOutside(ref,()=>{setModalOpen(false)}) //ref와 함수를 통해 setmodalopen을 false로 해야함
  return (
    <div className='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref} /*모달부분 여기다가 모달안과 밖을 구분해야함 */ >

          <span
            onClick={()=>setModalOpen(false)}
            className='modal-close'
          >
            X
          </span>
          <img
            className='modal__poster-img'
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt='modal__poster_img'
          />
          <div className='modal__content'>
            <p className="modal__details">
              <span className="modal__user_perc">100% for you</span>{" "}
              {release_date ? release_date : first_air_date}
            </p>
          <h2 className="modal__title">{title ? title : name}</h2>
          <p className='modal__overview'>평점: {vote_average}</p>
          <p className='modal__overview'>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal;

