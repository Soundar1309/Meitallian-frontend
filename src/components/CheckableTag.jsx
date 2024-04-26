import React, { useEffect, useState } from "react";
import { Flex, Tag } from "antd";

const CheckableTag = ({ label, tagData, setToppings }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  useEffect(() => {
    setToppings(selectedTags);
  }, [selectedTags]);
  return (
    <Flex gap={4} wrap="wrap" align="center">
      <span>{label}: </span>
      {tagData.map((tag, index) => (
        <div key={index}>
          <Tag.CheckableTag
            className="text-[16px] capitalize"
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
