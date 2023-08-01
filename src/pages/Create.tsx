import React, { useState,useEffect } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { AiFillDelete} from "react-icons/ai"
import {BiSave} from "react-icons/bi"
import {RiEnglishInput} from "react-icons/ri"
import {GiSpain} from "react-icons/gi"

import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Button,
  HStack,
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
  audio: Blob | null;
  //allow the user to upload audio files
}

const Form = () => {
  
  const [audioFile, setAudioFile] = useState<Blob | null>(null);
  const [formError, setFormError] = useState<PostgrestError | null>();

  const [formData, setFormData] = useState<FormData>({
    englishWord: "",
    foreignWord: "",
    genre: "",
    audio: audioFile,
  });

  

//@ts-ignore
  const handleSubmit =  async (e: React.MouseEventHandler<HTMLButtonElement>)=> {
	const { englishWord, foreignWord, genre, audio } = formData;
	if (audio){
		
	let audioUploadFile = new File([audio],"audio");
	console.log(audioUploadFile)

	const {data,error} = await supabase.storage.from('audio-files').upload('public/audio.mp3',audio)
	if (data){
		console.log(data);
	}
	if (error){
		console.log(error);
	}
	}


//     e.preventDefault();
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
      }

    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
   
  };

  const addAudioElement = (blob: Blob) => {
    setAudioFile(blob);
  };

  useEffect(() => {
	if (audioFile){
		const url = URL.createObjectURL(audioFile);
      const audio = document.createElement("audio");
      audio.src = url;
      audio.controls = true;
      document.body.appendChild(audio);
	}

  },[audioFile])

  const removeAudioElement = () => {
    setAudioFile(null);
    if (audioFile){
    const audio2 = document.getElementsByTagName("audio")[0];
    document.body.removeChild(audio2);
    URL.revokeObjectURL(audio2.src);
    }
  };




  return (
	<>
	<Heading>Add in a word pair</Heading>
<Box p={4}>
		
	    <FormControl 
	    isRequired 
	    mb={10}
	    //@ts-ignore
	    onSubmit={handleSubmit}>
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
	    <FormLabel>Add an audio recording</FormLabel>
	    <HStack spacing = "24px">
	  <AudioRecorder
			onRecordingComplete={addAudioElement}
			audioTrackConstraints={{
				noiseSuppression: true,
				echoCancellation: true,
			      }}
			showVisualizer={true}
			/>
	<Button  style={ {display: 'flex', justifyContent: 'space-between'}} leftIcon={<AiFillDelete/>} colorScheme='blue' variant='solid' onClick={removeAudioElement}>
	    Delete recording
	  </Button> 
	  </HStack>
	  <Button  mt={10}
	  leftIcon={<BiSave/>} 
	  colorScheme='teal' 
	  variant='solid'
	  style={ {display: 'flex', justifyContent: 'space-between'}}
	  type="submit"
	  //@ts-ignore
	  onClick={handleSubmit}
	  >
	    Submit
	
	  </Button>
		
	  
	    </FormControl>
</Box>
    </>
   
  );
};

export default Form;
