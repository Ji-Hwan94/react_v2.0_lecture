import { useEffect, useRef, useState, type FC } from 'react';
import './styled.css';
import { useRecoilState } from 'recoil';
import { modalState, type IModalState } from '../../../../stores/modalState';
import axios, { type AxiosResponse } from 'axios';

interface INoticeDetail {
  noticeId: number;
  loginId: string;
  noticeTitle: string;
  noitceContent: string;
  fileName: string | null;
  fileExt: string | null;
  fileSize: number | null;
  physicalPath: string | null;
  logicalPath: string | null;
}

interface INoticeDetailResponse {
  detailValue: INoticeDetail;
}

interface INoticeModalProps {
  noticeId?: number;
  onResearch?: () => void;
}

interface IPostResponse {
  result: 'success' | 'fail';
}

export const NoticeModal: FC<INoticeModalProps> = ({
  noticeId,
  onResearch,
}) => {
  const [modal, setModal] = useRecoilState<IModalState>(modalState);
  const [detail, setDetail] = useState<INoticeDetail>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    noticeId && searchDetail();
  }, []);

  const searchDetail = () => {
    axios
      .post('/api/system/noticeDetailBody.do', { noticeId })
      .then((res: AxiosResponse<INoticeDetailResponse>) => {
        setDetail(res.data.detailValue);
      });
  };

  const saveNotice = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    axios
      .post('/api/system/noticeFileSave.do', formData)
      .then((res: AxiosResponse<IPostResponse>) => {
        if (res.data.result === 'success') {
          alert('저장하였습니다.');
          setModal({ isOpen: false });
          // onResearch 함수가 선택적(optional) props일 때 안전하게 호출
          // onResearch가 undefined인 경우 에러 없이 무시
          onResearch?.();
        }
      });
  };

  const updateNotice = () => {
    if (!formRef.current || !noticeId) return;
    const formData = new FormData(formRef.current);
    // FormData.append()는 두 번째 인자로 string | Blob 타입을 기대함
    formData.append('noticeId', noticeId.toString());
    axios
      .post('/api/system/noticeFileUpdate.do', formData)
      .then((res: AxiosResponse<IPostResponse>) => {
        if (res.data.result === 'success') {
          alert('저장하였습니다.');
          setModal({ isOpen: false });
          // onResearch 함수가 선택적(optional) props일 때 안전하게 호출
          // onResearch가 undefined인 경우 에러 없이 무시
          onResearch?.();
        }
      });
  };

  const deleteNotice = () => {
    if (!noticeId) return;
    const param = new URLSearchParams();
    param.append('noticeId', noticeId.toString());
  };

  return (
    <div className="modal-overlay">
      <form className="modal-form modal-container" ref={formRef}>
        <label>
          제목 :
          <input
            type="text"
            name="fileTitle"
            defaultValue={detail?.noticeTitle}
          />
        </label>
        <label>
          내용 :
          <input
            type="text"
            name="fileContent"
            defaultValue={detail?.noitceContent}
          />
        </label>
        파일 :
        <input type="file" id="fileInput" name="file" />
        <label className="img-label" htmlFor="fileInput">
          파일 첨부하기
        </label>
        <div>
          <div>
            <label>미리보기</label>
            <img className="preview-image" />
          </div>
        </div>
        <div className="button-container">
          <button type="button" onClick={!noticeId ? saveNotice : updateNotice}>
            {!noticeId ? '저장' : '수정'}
          </button>
          {noticeId && (
            <button type="button" onClick={deleteNotice}>
              삭제
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setModal({ isOpen: !modal });
            }}
          >
            나가기
          </button>
        </div>
      </form>
    </div>
  );
};
