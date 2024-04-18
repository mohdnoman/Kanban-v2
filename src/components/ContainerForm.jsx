"use client"
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const ContainerForm = ({ onAddContainer, onClose }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim() === '') return;
    onAddContainer(title);
    setTitle('');

    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Container</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Container Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter container title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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

export default ContainerForm;
