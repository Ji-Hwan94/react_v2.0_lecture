import { useContext } from 'react';
import { ContentBox } from '../../components/common.componets/ContentBox/ContentBox';
import { NoticeMain } from '../../components/Support/Notice/NoticeMain/NoticeMain';
import { NoticeSearch2 } from '../../components/Support/Notice/NoticeSearch/NoticeSearch2';
// import { NoticeSearch } from '../../components/Support/Notice/NoticeSearch/NoticeSearch';
import { NoticeProvider } from '../../provider/NoticeProvider';
import { createSearchContext } from '../../provider/SearchProvider';

interface INoticeSearch {
  title: string;
  startDate: string;
  endDate: string;
}

const initialValue: INoticeSearch = {
  title: '',
  startDate: '',
  endDate: '',
};

// Provider를 사용하는 방법 1
// Context는 애플리케이션의 최상위 레벨에서 한 번만 생성되어야 합니다
// 생성된 Context를 재사용해야 합니다
// Provider로 감싸진 컴포넌트들만 Context에 접근할 수 있습니다
export const {
  SearchContext: NoticeSearchContext,
  SearchProvider: NoticeSearchProvider,
} = createSearchContext<INoticeSearch>();

// Provider를 사용하는 방법 2
// 커스텀 훅 생성
// 사용 이유
// 1. 유지보수성 향상
// 2. Context 사용 로직이 한 곳에 집중, 추후 로직 변경 시 훅만 수정하면 됨
// 3. 디버깅 용이성
// 4. 에러 처리와 유효성 검사를 훅에서 중앙 집중적으로 관리
//    문제 발생 시 원인 파악이 쉬움
//    컴포넌트 로직 단순화
export const useNoticeSearch = () => {
  return useContext(NoticeSearchContext);
};

export const Notice = () => {
  return (
    <NoticeSearchProvider initValue={initialValue}>
      <ContentBox>공지사항</ContentBox>
      <NoticeSearch2></NoticeSearch2>
      {/* <NoticeSearch></NoticeSearch> */}
      <NoticeMain />
    </NoticeSearchProvider>
  );
};
