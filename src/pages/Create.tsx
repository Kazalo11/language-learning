import React, { useState} from "react";
import {BiSave} from "react-icons/bi"
import {RiEnglishInput} from "react-icons/ri"
import {GiSpain} from "react-icons/gi"
import { useNavigate } from "react-router-dom"

import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Button,
  Box,
  InputLeftAddon,
  InputGroup
} from "@chakra-ui/react";

import { PostgrestError } from "@supabase/supabase-js";
import supabase from "../config/supabaseClient";

interface FormData {
  englishWord: string;
  foreignWord: string;
  genre: string;
}

const Form = () => {
  
  const [formError, setFormError] = useState<PostgrestError | null>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    englishWord: "",
    foreignWord: "",
    genre: ""
  });

  

  const handleSubmit =  async () => {
	const { englishWord, foreignWord, genre} = formData;


    const {data, error} = await supabase
    .from('Vocabulary')
    .insert([{english_word: englishWord, foreign_word: foreignWord, genre: genre}])
    

    if (error) {
	// console.log(error);
	setFormError(error);
    }

    if (data) {
	// console.log(data)
	setFormError(null);
	navigate('/');
	
	
      }

    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
   
  };



  return (
	<>
	<Heading>Add in a word pair</Heading>
<Box p={4}>
		
	    <FormControl 
	    isRequired 
	    mb={10}>
	      <FormLabel>English Word</FormLabel>
	      <InputGroup>
	      <InputLeftAddon children={<RiEnglishInput />} />
	      <Input
	      colorScheme="grey"
	      variant='filled'
		type="text"
		name="englishWord"
		value={formData.englishWord}
		onChange={handleChange}
		mb={10}
	
	      />
	      </InputGroup>
	
	      <FormLabel>Foreign Word</FormLabel>

	      <InputGroup>
	      <InputLeftAddon children={<GiSpain/>}/>
		<Input
		colorScheme="grey"
				variant='filled'
				type="text"
				name="foreignWord"
				value={formData.foreignWord}
				onChange={handleChange}
				mb={10}
		/>
	      </InputGroup>
	      <FormLabel>Genre</FormLabel>
	      <Select colorScheme="grey" placeholder='Select genre' name="genre" onChange={handleChange} variant='filled' mb={10}>
	    <option>Food and Drink</option>
	    <option>Numbers</option>
	    <option>People</option>
	    <option>Time</option>
	    <option>Core Vocab</option>
	    <option>Core Verbs</option>
	    <option>Slang</option>
	    </Select>
	    
	  <Button  mt={10}
	  leftIcon={<BiSave/>} 
	  colorScheme='teal' 
	  variant='solid'
	  style={ {display: 'flex', justifyContent: 'space-between'}}
	  type="submit"
	  onClick={() => handleSubmit()}>
	    Submit
	
	  </Button>
		
	  
	    </FormControl>
</Box>
    </>
   
  );
};

export default Form;
