import { Button, HStack } from "@chakra-ui/react";
import {Link} from "react-router-dom"
import React from "react";

const Header = () =>{
    return(
        <HStack bgColor={"blackAlpha.900"} p={'4'} shadow={'base'}>
            <Button variant={'unstyled'} color={'white'}>
                <Link to='/'>Home</Link>
            </Button>
            <Button variant={'unstyled'} color={'white'}>
                <Link to='/exchanges'>Exchanges</Link>
            </Button>
            <Button variant={'unstyled'} color={'white'}>
                <Link to='/coin'>coins</Link>
            </Button>
            
        
        </HStack>
    )
}

export default Header
