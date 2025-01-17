import { 
  Box,
  HStack,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text, 
  useColorModeValue, 
  useDisclosure, 
  useToast,
  VStack,
  Input, 
  ModalFooter,
  Button
} from '@chakra-ui/react'
import React, { useState } from 'react'
import {DeleteIcon,EditIcon} from '@chakra-ui/icons'
import { useProductStore } from '../store/Product'

const ProductCard = ({product}) => {
  const textColor = useColorModeValue('gray.800','gray.200')
  const bg = useColorModeValue('white','gray.800')
  const {deleteProduct,updateProduct} = useProductStore()
  const toast = useToast()
  const {isOpen,onOpen,onClose} = useDisclosure()
  const [updatedData,setUpdatedData] = useState({
    name:product.name,
    image:product.image,
    price:product.price
  })

  const handleDeleteProduct = async(pid)=>{
    const {success,message} = await deleteProduct(pid)
    if(!success){
      toast({
        title:"Error",
        description:message,
        status:'error',
        duration:3000,
        isClosable:true

      })
    }
    else{
        toast({
          title:'Success',
          description:message,
          status:'success',
          duration:3000,
          isClosable:true
        })
    }
  }
  const handleUpdateProduct = async (pid) => {
		const { success, message } = await updateProduct(pid, updatedData);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

  return (
    <Box
        shadow='lg'
        rounded="lg"
        overflow="hidden"
        transition='all 0.3s'
        _hover={{transform:'translateY(-5px)',shadow:'xl'}}
        bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover"/>
      <Box p={4}>
        <Heading as='h3' size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue' />
          <IconButton icon={<DeleteIcon/>} onClick={()=>handleDeleteProduct(product._id)} colorScheme='red' />

        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>
            Update Product
          </ModalHeader>

          <ModalCloseButton/>

          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedData.name}
                onChange={(e)=>setUpdatedData({...updatedData,name:e.target.value})} 
              />
              <Input
                placeholder='Price'
                name='price'
                type='number'
                value={updatedData.price}
                onChange={(e)=>setUpdatedData({...updatedData,price:e.target.value})} 
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={updatedData.image}
                onChange={(e)=>setUpdatedData({...updatedData,image:e.target.value})} 
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>handleUpdateProduct(product._id)}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>

      </Modal>
    </Box>
  )
}

export default ProductCard