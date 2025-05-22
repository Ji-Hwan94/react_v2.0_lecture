import { Portal } from '../../../../common/Portal';
import { NoticeModal } from '../NoticeModal/NoticeModal';
import './styled.css';
import { modalState, type IModalState } from '../../../../stores/modalState';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import axios, { type AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { PageNavigation } from '../../../common.componets/PageNavigation/PageNavigation';
import { NoticeContext } from '../../../../provider/NoticeProvider';

interface INotice {
  noticeId: number;
  loginId: string;
  noticeTitle: string;
  noitceContent: string;
  regDate: string;
}

interface INoticeResponse {
  noticeList: INotice[];
  noticeCnt: number;
}

export const NoticeMain = () => {
  const [modal, setModal] = useRecoilState<IModalState>(modalState);
  const { search } = useLocation();
  const [noticeList, setNoticeList] = useState<INotice[]>([]);
  const [noticeCount, setNoticeCount] = useState<number>(0);
  // const [noticeId, setNoticeId] = useState<number>(0); noticeId를 따로 상태값으로 빼서 사용하는 방법
  const { searchData } = useContext(NoticeContext);

  // URLSearchParams으로 검색하는 기능
  // useEffect(() => {
  //   searchList();
  // }, [search]);

  // Provider로 검색하는 기능
  // useEffect(() => {
  //   searchList();
  // }, [searchData]);

  const searchList = (cPage?: number) => {
    cPage = cPage || 1;
    const searchParam = new URLSearchParams(search);
    searchParam.append('currentPage', cPage.toString());
    searchParam.append('pageSize', '5');

    axios
      .post('/api/support/noticeListBody.do', searchParam)
      .then((res: AxiosResponse<INoticeResponse>) => {
        setNoticeList(res.data.noticeList);
        setNoticeCount(res.data.noticeCnt);
      });
  };

  const openModal = (id: number) => {
    setModal({ isOpen: true, payload: id });
  };

  return (
    <div className="notice-main-container">
      {modal.isOpen && (
        <Portal>
          <NoticeModal
            noticeId={modal.payload as number}
            onResearch={searchList}
          />
        </Portal>
      )}

      <table className="notice-table">
        <thead className="notice-table-header">
          <tr>
            <th>공지번호</th>
            <th>공지 제목</th>
            <th>공지 날짜</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.length > 0 ? (
            noticeList.map((notice) => {
              return (
                <tr key={notice.noticeId} className="notice-table-row">
                  <td className="notice-cell">{notice.noticeId}</td>
                  <td
                    className="notice-cell cursor-pointer text-blue-600 hover:text-blue-800"
                    onClick={() => openModal(notice.noticeId)}
                  >
                    {notice.noticeTitle}
                  </td>
                  <td className="notice-cell">{notice.regDate}</td>
                  <td className="notice-cell">{notice.loginId}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="notice-empty-row">
                등록된 공지사항이 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <PageNavigation
        totalItems={noticeCount}
        itemsPerPage={5}
        onPageChange={searchList}
      />
    </div>
  );
};
