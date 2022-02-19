import { useEffect, FC } from "react";

import LocationList from "../List/LocationList";

import { Action } from "../../App/Reducer/AppReducer";
import { getPaginationGroupArray } from "../../../utils/getPaginationArr";

import { LocationProps } from "../../../utils/types";

interface LocationListPaginationProps {
  pageLimit: number;
  dataLimit: number;
  pageNumber: number;
  data: LocationProps[];
  dispatch: React.Dispatch<Action>;
  handleLocationWeather: (id: number, urlType: string) => Promise<void>;
}

export const LocationListPagination: FC<LocationListPaginationProps> = ({
  pageLimit,
  dataLimit,
  pageNumber,
  data,
  dispatch,
  handleLocationWeather,
}) => {
  let totalPageCount: number = Math.ceil(data.length / dataLimit);

  const handleNextPage = () => {
    if (pageNumber === totalPageCount) return;

    dispatch({type: "nextListPage"})
  };

  const handlePreviousPage = () => {
    if (pageNumber === 1) return;

    dispatch({type: "previousListPage"})
  };

  const handleArrowPress = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePreviousPage();
    }

    if (e.key === "ArrowRight") {
      handleNextPage();
    }
  };

  const handleChangePage = (e: React.BaseSyntheticEvent) => {
    const page: number = Number(e.target.textContent);
    dispatch({type: "selectListPage", value: page})
  };

  const getPaginatedData = (): LocationProps[] => {
    const startIndex: number = pageNumber * dataLimit - dataLimit;
    const endIndex: number = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = (): number[] => {
    const paginationNumberArray = getPaginationGroupArray(
      pageNumber,
      pageLimit
    );
    let index: number;

    if (paginationNumberArray.includes(totalPageCount)) {
      index = paginationNumberArray.indexOf(totalPageCount);
      paginationNumberArray.length = index + 1;
      return paginationNumberArray;
    }

    return paginationNumberArray;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleArrowPress);
    return function cleanup() {
      window.removeEventListener("keydown", handleArrowPress);
    };
  }, [handleArrowPress]);

  return (
      <div className="pagination_component">
        {/* show the posts, 10 posts at a time */}
        <div className="dataContainer">
          {getPaginatedData().map((data, index) => (
            <LocationList
              key={index}
              data={data}
              dispatch={dispatch}
              onLocationWeather={handleLocationWeather}
            />
          ))}
        </div>
        <div className="pagination">
          {/* previous button */}
          <button
            className={`prev ${pageNumber === 1 ? "disabled" : ""}`}
            onClick={handlePreviousPage}
          >
            prev
          </button>

          {/* show page numbers */}
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              id={index.toString()}
              onClick={handleChangePage}
              className={`paginationItem ${
                pageNumber === item ? "active" : "inactive"
              }`}
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            className={`next ${
              pageNumber === totalPageCount ? "disabled" : ""
            }`}
            onClick={handleNextPage}
          >
            next
          </button>
        </div>
      </div>
  );
};

export default LocationListPagination;
