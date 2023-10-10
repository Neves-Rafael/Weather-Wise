import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "@/shared/apis";

type Props = {
  onSearchChange: (searchData: searchData) => void;
  latitude: number;
  longitude: number;
  name: string;
  countryCode: number;
};

type dados = {
  longitude: number;
  latitude: number;
  name: string;
  countryCode: number;
};

type searchData = {
  longitude: number;
  latitude: number;
  name: string;
  countryCode: number;
};

const imputStyle =
  "rounded-lg  w-[300px] placeholder:text-center p-1 focus:border-blue-500 focus:outline-none text-[18px]";

const Search = ({ onSearchChange }: Props) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue: string) => {
    return fetch(
      `${GEO_API_URL}/?countryIds=BR&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city: dados) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData: searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Pesquise Sua Cidade"
      className={imputStyle}
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
    // <div>
    //   <input
    //     type="text"
    //     className={imputStyle}
    //     placeholder="Selecione a sua Cidade"
    //   />
    // </div>
  );
};

export default Search;
