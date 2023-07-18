import React, { FC, useState } from "react";
import Select from "react-select";
import { useAppDispatch } from "../store/hook";
import { setFilters } from "../store/features/movieSlice";

interface Props {
  genres: [{ value: string; label: string }];
}

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#A2CCEB" : "white",
    color: state.isFocused ? "white" : "black",
    ":hover": {
      backgroundColor: state.isFocused ? "#A2CCEB" : "lightblue",
    },
  }),
};

export const SearchBar: FC<Props> = ({ genres }) => {
  const [orderBy, setOrderBy] = useState(false);

  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="flex">
        <Select
          styles={customStyles}
          className="w-full"
          name="genre"
          options={genres}
          onChange={(value) => {
            dispatch(setFilters({ type: "genre", name: value?.value as any }));
          }}
        />
        <button
          className="bg-green-30 w-[200px]"
          onClick={() => {
            setOrderBy(!orderBy);
            dispatch(
              setFilters({ type: "orderBy", name: !orderBy ? "DESC" : "ASC" })
            );
          }}
        >
          Year {!orderBy ? "Descending" : "Ascending"}
        </button>

        <button
          className="bg-grey-20 w-[150px] rounded-tr-lg rounded-br-lg"
          onClick={() => {
            dispatch(setFilters({ type: "orderBy", name: "" }));
            dispatch(setFilters({ type: "genre", name: "" }));
          }}
        >
          Delete filters
        </button>
      </div>
    </div>
  );
};
