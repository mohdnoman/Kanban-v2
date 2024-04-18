"use client"
import React, { useState, useEffect } from 'react';
import { Button, ChakraProvider, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@chakra-ui/react';
import theme from './theme';
import Container from '../components/Container';
import ContainerForm from '../components/ContainerForm';
import { v4 as uuidv4 } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Home = () => {
  const [containers, setContainers] = useState([{ title: 'To Do', CID: '123456765432' }]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedContainers = JSON.parse(localStorage.getItem('containers'));
    if (storedContainers) {
      setContainers(storedContainers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('containers', JSON.stringify(containers));
  }, [containers]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddItem = (newItem) => {
    newItem = { ...newItem, id: uuidv4() };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (itemIdToDelete) => {
    setItems(items.filter(item => item.id !== itemIdToDelete));
  };

  const handleAddContainer = (title) => {
    const newCID = uuidv4();
    setContainers([...containers, { title, CID: newCID }]);
    onClose();
  };

  const handleDeleteContainer = (CIDToDelete) => {
    setContainers(containers.filter(container => container.CID !== CIDToDelete));
  };

  const handleDropItem = (item, targetCID) => {
    setItems(items.map(i => (i.id === item.id ? { ...i, CID: targetCID } : i)));
  };

  return (
    <ChakraProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <main className="min-h-screen flex-col items-center justify-center p-4">
          <div className="flex felx-wrap justify-between items-center p-4">
            <Text className="text-3xl text-stone-400 font-sans">Kanban Board</Text>
            <div>
              <Button type="button" className="text-stone-300 bg-stone-700 p-2 px-4 rounded-xl" onClick={onOpen}>Add Container</Button>
            </div>
          </div>
          <section className="flex justify-center p-6 gap-4 pt-10">
            {containers.length > 0 ? (
              containers.map(container => (
                <Container
                  key={container.CID}
                  items={items}
                  CID={container.CID}
                  title={container.title}
                  setItems={setItems}
                  handleAddItem={handleAddItem}
                  onDeleteItem={handleDeleteItem}
                  handleDeleteContainer={handleDeleteContainer}
                  onDropItem={handleDropItem}
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
      </DndProvider>
    </ChakraProvider>
  );
}

export default Home;
