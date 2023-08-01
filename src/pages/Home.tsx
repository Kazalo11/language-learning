import { useState,useEffect } from "react";
import supabase from "../config/supabaseClient";
const Home = () => {

	const [wordPair, setwordPair] = useState<any>(null);
	const [fetchError,setFetchError] = useState<string | null>(null);
	const [orderBy, setOrderBy] = useState('english_word');


	useEffect(() => {
		const fetchWords = async () => {
		  const { data, error } = await supabase
		    .from('recipes')
		    .select()
		    .order(orderBy, {ascending: false})
		  
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
		<h1>Home</h1>
		
	)
	
}

export default Home;