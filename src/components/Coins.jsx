

import React, { useEffect, useState } from "react";
import { coinServer } from "../index";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";

const Coin = () => {
  const [coins, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState("inr")
  const [page, setPage] = useState(1)

  const changepage = (page) =>{
      setPage(page)
      setLoading(true)
  }  


  const pag_btns = new Array(99).fill(1)

  const currencySymbol = currency === "inr"? "₹" : currency=== "usd"? "$" : "€";




  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const data = await fetch(`${coinServer}markets?vs_currency=${currency}&page=${page}`);
        const realData = await data.json();
        setLoading(false);
        setCoin(realData);
        console.log(realData)
      } catch (error) {

        setLoading(false)
        setError(true)
        

      }
    };


    fetchExchanges();
  }, [currency, page]);

  if(error) return <Error Message={'Error: Cant Loaded' }/>



  return (
    <Container maxWidth={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"}>
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                name={i.name}
                url={i.url}
                img={i.image}
                price={i.current_price}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack overflowX={'auto'} w={'full'} p={'8'}>
           {pag_btns.map((item, index)=>(

            <Button key={index} bgColor={"blackAlpha.900"} justifyContent={"space-evenly"} color={'white'} onClick={()=>changepage(index+1)}>{index+1}</Button>
           ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCard = ({id, name, rank, symbol, img, price, currencySymbol}) => {
  return (
    <Link to={`/coin/${id}`}>
      <VStack
        w={"52"}
        m={"4"}
        p={"10"}
        transition={"all .3s"}
        shadow={"lg"}
        cursor={"pointer"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} />
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>

        <Heading size={'sm'}>
          {symbol}
        </Heading>

        <Text>{name}</Text>
        <Text>{currencySymbol}{price}</Text>
      </VStack>
    </Link>
  );
};


export default Coin