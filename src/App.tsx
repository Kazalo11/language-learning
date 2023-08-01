import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import './App.css';
import Form from './pages/Create';
import { ChakraProvider, HStack } from '@chakra-ui/react'
import Home from './pages/Home';
import {Heading} from '@chakra-ui/react'

function App() {
  
  return (
    <div className='App'>
    <ChakraProvider>
        <Heading>Language Learning</Heading>
        <BrowserRouter>
      <nav>
        <HStack>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Smoothie</Link>
        </HStack>
        
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
    </div>
    
  );
}

export default App;
