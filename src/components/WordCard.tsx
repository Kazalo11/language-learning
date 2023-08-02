

import {
	Tag,
	Card,
	CardBody,
	Stack,
	StackDivider,
	Heading,
	Box,
	Text

      } from '@chakra-ui/react'

const WordCard = ({wordData}: any) => {

	return (
		// <div>
		// 	<h3>English Word: {wordData.english_word}</h3>
		// 	<h3>Foreign Word: {wordData.foreign_word}</h3>
		// 	<Tag>Genre: {wordData.genre}</Tag>

		// </div>
		<Card>
			<CardBody>
				<Stack divider={<StackDivider />} spacing='4'>
					<Box>
						<Heading size = 'sm' textTransform='uppercase'>
							English Word
						</Heading>
						<Text>{wordData.english_word}</Text>
					</Box>
					<Box>
						<Heading size = 'sm' textTransform='uppercase'>
							Foreign Word
						</Heading>
						<Text>{wordData.foreign_word}</Text>
					</Box>
					<Box>
						<Heading size='sm' textTransform='uppercase'>
							Genre
						</Heading>
						<Tag>{wordData.genre}</Tag>
					</Box>
				

				</Stack>
			</CardBody>
		</Card>
	)

}

export default WordCard