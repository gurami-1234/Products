import { 
    Button, 
    Container, 
    Flex,
    HStack,
    Text, 
    useColorMode,
    Icon } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
const Navbar = () => {
    const {colorMode,toggleColorMode} = useColorMode()
   
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={"space-between"} flexDir={{base:'column',sm:"row"}}>
            <Text
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r, cyan.400, blue.500)"}
                bgClip={"text"}
            >
                <Link to={"/"}>Product Store </Link>
            </Text>
            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <CiSquarePlus fontSize={20} />
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode==="light"? <Icon as={FaMoon} fontSize={20}/>:<Icon as={IoSunny} fontSize={20}/>}
                </Button>
                
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar