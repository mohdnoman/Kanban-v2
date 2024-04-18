"use client"
import React, { useState, useEffect } from 'react';
import { Button, ChakraProvider, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@chakra-ui/react';
import theme from './theme';
import Container from '../components/Container';
import ContainerForm from '../components/ContainerForm';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [containers, setContainers] = useState(() => {
    const savedContainers = localStorage.getItem('containers');
    return savedContainers ? JSON.parse(savedContainers) : [{ title: 'To Do', CID: '123456765432' }];
  });

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('containers', JSON.stringify(containers));
  }, [containers]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddItem = (newItem) => {
    if (typeof newItem === 'object' && newItem !== null) {
      if (!Array.isArray(items)) {
        setItems([newItem]);
      } else {
        if (
          newItem.hasOwnProperty('id') &&
          newItem.hasOwnProperty('title') &&
          newItem.hasOwnProperty('deadline') &&
          newItem.hasOwnProperty('CID')
        ) {
          newItem.id = String(Date.now());
          setItems([...items, newItem]);
        } else {
          console.error('New item is missing required properties.');
        }
      }
    } else {
      console.error('New item is not an object.');
    }
  };

  const handleDeleteItem = (itemIdToDelete) => {
    console.log('Deleting item with ID:', itemIdToDelete);
    const updatedItems = items.filter(item => item.id !== itemIdToDelete);
    console.log('Updated items:', updatedItems);
    setItems(updatedItems);
};


  const handleAddContainer = (title) => {
    const newCID = uuidv4();
    const newContainer = { title, CID: newCID };
    setContainers([...containers, newContainer]);
    onClose();
  };

  const handleDeleteContainer = (CIDToDelete) => {
    const updatedContainers = containers.filter(container => container.CID !== CIDToDelete);
    setContainers(updatedContainers);
  };

  return (
    <ChakraProvider theme={theme}>
      <main className="min-h-screen  flex-col items-center justify-center p-4">
        <div className="flex felx-wrap justify-between items-center p-4">
          <Text className="text-3xl text-stone-400 font-sans">Kanban Board</Text>
          <div>
            <Button type="button" className="text-stone-300 bg-stone-700 p-2 px-4 rounded-xl" onClick={onOpen}>Add Container</Button>
          </div>
        </div>
        <section className="flex justify-center p-6 gap-4 pt-10">
          {containers.length > 0 ? (
            containers.map((container) => (
              <Container
                key={container.CID}
                items={items}
                CID={container.CID}
                title={container.title}
                setItems={setItems}
                handleAddItem={handleAddItem}
                onDeleteItem={handleDeleteItem} 
                handleDeleteContainer={handleDeleteContainer}
              />
            ))
          ) : (
            <Text>Add containers to manage your tasks</Text>
          )}
        </section>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Container</ModalHeader>
            <ModalBody>
              <ContainerForm onAddContainer={handleAddContainer} onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </main>
    </ChakraProvider>
  );
}

export default Home;
