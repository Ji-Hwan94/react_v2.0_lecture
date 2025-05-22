import { useEffect, useRef, useState } from 'react';
import './styeld.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalState, type IModalState } from '../../../../stores/modalState';

export const NoticeSearch = () => {
  const title = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [_, setModal] = useRecoilState<IModalState>(modalState);
  const navigate = useNavigate();
  useEffect(() => {
    window.location.search &&
      navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handlerSearch = () => {
    const query: string[] = [];

    !title?.current?.value || query.push(`title=${title.current.value}`);
    !startDate || query.push(`startDate=${startDate}`);
    !endDate || query.push(`endDate=${endDate}`);

    const queryString = query.length > 0 ? `?${query.join('&')}` : '';
    navigate(`${queryString}`);
  };
  return (
    <div className="notice-container">
      <div className="input-box">
        제목: <input ref={title}></input>
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        ></input>
        <input type="date" onChange={(e) => setEndDate(e.target.value)}></input>
        <button onClick={handlerSearch}>검색</button>
        <button
          onClick={() => {
            setModal({ isOpen: true });
          }}
        >
          등록
        </button>
      </div>
    </div>
  );
};
