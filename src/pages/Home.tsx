import { useState,useEffect } from "react";
import supabase from "../config/supabaseClient";
import WordCard from "../components/WordCard";
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
		{	
			wordPair && (
				<div>
				{wordPair.map((w: any) => (
					<WordCard key={w.id} wordData={w} />
					))}
				</div>
			)

		}
		</div>
		
	)
	
}

export default Home;