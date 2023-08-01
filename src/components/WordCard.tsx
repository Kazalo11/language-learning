

import {
	Tag,

      } from '@chakra-ui/react'

const WordCard = ({wordData}: any) => {

	return (
		<div>
			<h3>English Word: {wordData.english_word}</h3>
			<h3>Foreign Word: {wordData.foreign_word}</h3>
			<Tag>Genre: {wordData.genre}</Tag>

		</div>
	)

}

export default WordCard