import {AutoComplete, Input} from "antd";
import React, {useState} from "react";

const getRandomInt = (max, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}>
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer">
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
const options = [
  {
    value: "emplacement",
    label: "emplacement",
    children: [
      {
        value: "child",
        label: "child",
        children: [
          {
            value: "childd1",
            label: "childd1",
          },
          {
            value: "child2",
            label: "child2",
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: "emplacement1",
    label: "emplacement 1",
    children: [
      {
        value: "emplacement 2",
        label: "emplacement2",
        children: [
          {
            value: "child1",
            label: "child1",
          },
        ],
      },
    ],
  },
];
const Searchi = () => {
  const [options, setOptions] = useState([]);
  

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{
        width: 280,
      }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}>
      <Input.Search size="large" placeholder="Code Dossier" enterButton />
    </AutoComplete>
  );
};

export default Searchi;
