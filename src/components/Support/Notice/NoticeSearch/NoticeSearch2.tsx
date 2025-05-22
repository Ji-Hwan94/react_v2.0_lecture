import { useContext, useRef, useState } from 'react';
import { modalState, type IModalState } from '../../../../stores/modalState';
import './styeld.css';
import { useRecoilState } from 'recoil';
import { NoticeContext } from '../../../../provider/NoticeProvider';
import {
  NoticeSearchContext,
  useNoticeSearch,
} from '../../../../pages/Support/Notice';

export const NoticeSearch2 = () => {
  const [_, setModal] = useRecoilState<IModalState>(modalState);
  const title = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  // const { setSearchData } = useContext(NoticeContext);
  const { setSearchData } = useNoticeSearch();

  const handlerSearch = () => {
    setSearchData({
      title: title.current ? title.current.value : '',
      startDate: startDate || '',
      endDate: endDate || '',
    });
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
