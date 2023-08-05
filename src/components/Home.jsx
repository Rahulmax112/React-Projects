import { Box, Heading, Image} from '@chakra-ui/react'
import React from 'react'
import crypto from "../assests/crypto.jpg"


const Home = () => {
  
  return (
    <Box w={'full'} bgColor={"blackAlpha.700"} >
      <Image w={'full'} src={crypto} h={'500px'}/>
      <Heading fontFamily={"cursive"} h={"100px"} fontWeight={"bold"} bgColor={"black"} color={"silver"} textAlign={"center"} mt={'-5'}>CRYPTO INFO</Heading>
    </Box>
  )
}

export default Home