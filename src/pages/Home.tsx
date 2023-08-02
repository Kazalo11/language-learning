import { useState,useEffect } from "react";
import supabase from "../config/supabaseClient";
import WordCard from "../components/WordCard";
import { SimpleGrid,Heading } from "@chakra-ui/react";
const Home = () => {

	const [wordPair, setwordPair] = useState<any>(null);
	const [fetchError,setFetchError] = useState<string | null>(null);
	const [orderBy, setOrderBy] = useState('english_word');


	useEffect(() => {
		const fetchWords = async () => {
		  const { data, error } = await supabase
		    .from('Vocabulary')
		    .select('*')
		  
		  if (error) {
		    setFetchError('Could not fetch the data')
		    setwordPair(null)
		  }
		  if (data) {
		    setwordPair(data)
		    setFetchError(null)
		  }
		}
	    
		fetchWords()
	    
	      }, [orderBy])

	return (
		<div>
			{fetchError && (<p>{fetchError}</p>)}
			<Heading size = 'md'> Words entered so far</Heading>
			
		{	
			wordPair && (
				<SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
				{wordPair.map((w: any) => (
					<WordCard key={w.id} wordData={w} />
					))}
				</SimpleGrid>
			)

		}
		</div>
		
	)
	
}

export default Home;