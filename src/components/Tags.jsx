import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag, theme } from "antd";

const Tags = ({ toppings, setToppings, defaultValue }) => {
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  const handleClose = (removedTag) => {
    const newTags = toppings.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setToppings(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && toppings.indexOf(inputValue) === -1) {
      setToppings([...toppings, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag) => (
    <span
      key={tag}
      style={{
        display: "inline-block",
      }}
    >
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    </span>
  );
  const tagChild = toppings.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "solid",
    padding: "5px 10px",
  };
  return (
    <>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <div>{tagChild}</div>
      </div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{
            width: 78,
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput} style={tagPlusStyle}>
          <PlusOutlined /> New Topping
        </Tag>
      )}
    </>
  );
};
export default Tags;