import React, { createContext, useState, type FC } from 'react';

interface INoticeContext {
  searchData: {
    title: string;
    startDate: string;
    endDate: string;
  };
  setSearchData: (params: Partial<INoticeContext['searchData']>) => void;
}

const defaultValue: INoticeContext = {
  searchData: {
    title: '',
    startDate: '',
    endDate: '',
  },
  setSearchData: () => {},
};

export const NoticeContext = createContext(defaultValue);

// ReactNode, ReactElement
export const NoticeProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  // <Partial<INoticeContext['searchData']>>
  const [searchData, setSearchData] = useState(defaultValue.searchData);

  // 컴포넌트에서 더 안전하게 상태를 업데이트할 수 있습니다
  // 상태 관리 로직을 한 곳에서 관리할 수 있습니다
  // 추후 기능 확장이 용이해집니다 (trim을 이용해서 공백 제거 등)
  const updateSearchData = (params: Partial<INoticeContext['searchData']>) => {
    setSearchData((prev) => ({ ...prev, ...params }));
  };

  return (
    <NoticeContext.Provider
      value={{ searchData, setSearchData: updateSearchData }}
    >
      {children}
    </NoticeContext.Provider>
  );
};
