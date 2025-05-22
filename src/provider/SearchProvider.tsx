import React, { createContext, useState, type FC } from 'react';

interface ISearchContext<T> {
  searchData: T;
  setSearchData: (params: Partial<T>) => void;
}

interface ISearchProviderProps<T> {
  children: React.ReactNode | React.ReactNode[];
  initValue: T;
}

// TypeScript 파서가 <T>를 JSX 태그로 잘못 해석할 수 있음
// 콤마를 추가하여 이것이 JSX가 아닌 제네릭 타입 파라미터임을 명확히 함
export const createSearchContext = <T,>() => {
  const defaultValue: ISearchContext<T> = {
    searchData: {} as T,
    setSearchData: () => {},
  };

  const SearchContext = createContext(defaultValue);

  // ReactNode, ReactElement
  const SearchProvider: FC<ISearchProviderProps<T>> = ({
    children,
    initValue,
  }) => {
    // <Partial<ISearchContext['searchData']>>
    const [searchData, setSearchData] = useState(initValue);

    // 컴포넌트에서 더 안전하게 상태를 업데이트할 수 있습니다
    // 상태 관리 로직을 한 곳에서 관리할 수 있습니다
    // 추후 기능 확장이 용이해집니다 (trim을 이용해서 공백 제거 등)
    const updateSearchData = (params: Partial<T>) => {
      setSearchData((prev) => ({ ...prev, ...params }));
    };

    return (
      <SearchContext.Provider
        value={{ searchData, setSearchData: updateSearchData }}
      >
        {children}
      </SearchContext.Provider>
    );
  };

  return { SearchProvider, SearchContext };
};
