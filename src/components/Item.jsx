import React from "react";
import { Box, Text, CloseButton } from "@chakra-ui/react";

const Item = ({ item, onDelete }) => {
  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <Box
      key={item.id}
      bg="white"
      p="4"
      borderRadius="md"
      boxShadow="sm"
      mb="2"
      position="relative"
    >
      <Text className="text- text-stone-600 text-lg">{item.title}</Text>
      <Text fontSize="sm" color="gray.500">
        Deadline: {new Date(item.deadline).toLocaleDateString()}
      </Text>

      <CloseButton
        position="absolute"
        top="1"
        right="1"
        size="sm"
        onClick={handleDelete} 
      />
    </Box>
  );
};

export default Item;
