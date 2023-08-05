import React, { useEffect, useState } from "react";
import { server } from "../index";
import {
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";

const Exchanges = () => {
  const [exchange, setExchange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)


  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const data = await fetch(`${server}`);
        const realData = await data.json();
        setLoading(false);
        setExchange(realData);
      } catch (error) {

        setLoading(false)
        setError(true)
        

      }
    };


    fetchExchanges();
  }, []);

  if(error) return <Error Message={'Error: Cant Loaded' }/>

  return (
    <Container maxWidth={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"}>
            {exchange.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                rank={i.market_data.market_cap_rank}
                url={i.url}
                img={i.image.small}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, rank, url, img }) => {
  return (
    <a href={url} target="blank">
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

        <Text>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
