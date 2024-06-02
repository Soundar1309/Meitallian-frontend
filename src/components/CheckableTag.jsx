import React, { useEffect, useState } from "react";
import { Flex, Tag } from "antd";

const CheckableTag = ({ label, tagData, setToppings, setError }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const handleChange = (tag, checked) => {
    setError({ error: false, message: "" });
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  useEffect(() => {
    setToppings(selectedTags);
  }, [selectedTags]);
  return (
    <Flex gap={4} wrap="wrap" align="center">
      <span>{label} </span>
      {tagData.map((tag, index) => (
        <div key={index}>
          <Tag.CheckableTag
            className="text-[17px] capitalize px-4 py-2 m-1 border border-primary solid-darkgreen text-black rounded-2"
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </Tag.CheckableTag>
        </div>
      ))}
    </Flex>
  );
};
export default CheckableTag;
