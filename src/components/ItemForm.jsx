"use client";
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid'; 

const ItemForm = ({ onAddItem, onClose, CID }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = () => {
    if (title.trim() === '' || deadline.trim() === '') return;
    const deadlineDate = new Date(deadline);
    const newItem = {
      id: uuidv4(), 
      title,
      deadline: deadlineDate,
      CID
    };
    onAddItem(newItem);

    setTitle('');
    setDeadline('');
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Item</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter item title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Deadline</FormLabel>
            <InputGroup>
              <Input
                type="date"
                placeholder="Enter deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              <InputRightElement children={<Button onClick={() => setDeadline('')}>Clear</Button>} />
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ItemForm;
