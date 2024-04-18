"use client"
import React from "react";
import { Box, Text, CloseButton } from "@chakra-ui/react";
import { useDrag } from 'react-dnd';

const Item = ({ item, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { id: item.id, type: 'ITEM' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

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
      ref={drag}
      style={{ cursor: "grab", border: "2px solid transparent" }}
    >
      <Text className=" text-stone-600 text-lg">{item.title}</Text>
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
