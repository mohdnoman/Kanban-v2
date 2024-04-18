"use client"
import React, { useState } from "react";
import { Box, Text, Button, CloseButton } from "@chakra-ui/react";
import ItemForm from "./ItemForm";
import Item from "./Item";
import { useDrop, useDrag } from 'react-dnd';

const Container = ({ title, items, CID, setItems, handleDeleteContainer, onDeleteItem, onDropItem }) => {
  const containerItems = items.filter(item => item.CID === CID);
  const [isItemFormOpen, setIsItemFormOpen] = useState(false);

  const handleAddItem = (newItem) => {
    newItem = { ...newItem, CID: CID };
    setItems([...items, newItem]);
    setIsItemFormOpen(false);
  };

  const handleOpenItemForm = () => {
    setIsItemFormOpen(true);
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (item, monitor) => {
      if (item.CID !== CID) {
        onDropItem(item, CID);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'CONTAINER',
    item: { CID, type: 'CONTAINER' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      bg={isOver ? 'gray.200' : 'gray.100'}
      p="4"
      borderRadius="md"
      boxShadow="md"
      mb="4"
      position="relative"
      minWidth="15rem"
      ref={drop}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <CloseButton
        position="absolute"
        top="1"
        right="1"
        size="sm"
        onClick={() => handleDeleteContainer(CID)}
      />
      <Text fontSize="lg" fontWeight="bold" mb="2" ref={drag}>
        {title}
      </Text>
      {containerItems.map(item => (
        <Item key={item.id} item={item} onDelete={onDeleteItem} />
      ))}
      <Button size="sm" mt="2" onClick={handleOpenItemForm}>
        Add item
      </Button>
      {isItemFormOpen && (
        <ItemForm
          onAddItem={handleAddItem}
          onClose={() => setIsItemFormOpen(false)}
        />
      )}
    </Box>
  );
};

export default Container;
