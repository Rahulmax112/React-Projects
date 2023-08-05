import {
  Box,
  Container,
  Radio,
  RadioGroup,
  HStack,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Badge,
  Heading,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { chartServer, coinServer } from "..";
import Error from "./Error";
import { Chart } from "./Chart";
import { wrap } from "framer-motion";

const CoinDetails = () => {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [coindetails, setcoinDetails] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [chartArray, setChartArray] = useState([]);
  const [days, setDays] = useState("24h");

  const params = useParams();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const chartswichSelector = (i) => {
    switch (i) {
      case "24h":
        setDays("24h");
        setLoader(true);
        break

      case "7d":
        setDays("7d");
        setLoader(true);
        break

      case "14d":
        setDays("14d");
        setLoader(true);
        break

      case "30d":
        setDays("30d");
        setLoader(true);
        break

      case "60d":
        setDays("60d");
        setLoader(true);
        break

      case "200d":
        setDays("200d");
        setLoader(true);
        break

      case "365d":
        setDays("365d");
        setLoader(true);
        break

      case "max":
        setDays("max");
        setLoader(true);
        break
    }
  };

  useEffect(() => {
    try {
      const fetchcoinDetails = async () => {
        const data = await fetch(`${coinServer}${params.id}`);
        const arrayData = await data.json();
        console.log(params.id);

        const chartdata = await fetch(`${chartServer}&days=${days}`);
        const chartArrData = await chartdata.json();

        setChartArray(chartArrData.prices);
        setLoader(false);
        setcoinDetails(arrayData);

        console.log(arrayData);
        console.log(chartArrData);
      };

      fetchcoinDetails();
    } catch (error) {
      setLoader(false);
      setError(true);
    }
  }, [params.id, currency, days]);

  const currency_sym =
    currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

  if (error) <Error Message={"Details haven't Fetched"} />;

  return (
    <Container maxW={"container.lg"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"}>
            <Chart currency={currency_sym} arr={chartArray} days={days} />
          </Box>

          <HStack p={"6"} wrap={wrap}>
            {btns.map((i) => (
              <Button key={i} onClick={() => chartswichSelector(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency}>
            <HStack spacing={"4"} p={"8"}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack alignItems={"flex-start"} spacing={"4"}>
            <Text size={"small"}>
              Last Updated on {""}{" "}
              {Date(coindetails.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coindetails.image.large} w={"16"} h={"16"} />

            <Stat>
              <StatLabel>{coindetails.name}</StatLabel>
              <StatNumber>
                {currency_sym}
                {coindetails.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coindetails.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coindetails.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"lg"} bgColor={"blackAlpha.700"} color={"white"}>
              {`#${coindetails.market_cap_rank}`}
            </Badge>

            <VStack w={"full"}>
              <Progress value={29} colorScheme={"blue"} w={"full"} />
              <HStack w={"full"} justifyContent={"space-between"}>
                <Badge children={262} colorScheme="red"></Badge>
                <Text>24h Range</Text>
                <Badge children={22} colorScheme="green"></Badge>
              </HStack>
            </VStack>

            <Box p={"4"} w={"full"}>
              <HStack justifyContent={"space-between"} p={"2"}>
                <Heading fontSize={"lg"}>Max Supply</Heading>
                <Text>{coindetails.market_data.max_supply}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} p={"2"}>
                <Heading fontSize={"lg"}>Circulating Supply</Heading>
                <Text>{coindetails.market_data.Circulating_supply}</Text>
              </HStack>
              <HStack justifyContent={"space-between"} p={"2"}>
                <Heading fontSize={"lg"}>Market Cap</Heading>
                <Text>
                  {currency_sym}
                  {coindetails.market_data.market_cap[currency]}
                </Text>
              </HStack>
              <HStack justifyContent={"space-between"} p={"2"}>
                <Heading fontSize={"lg"}>All time low</Heading>
                <Text>
                  {currency_sym}
                  {coindetails.market_data.atl[currency]}
                </Text>
              </HStack>
              <HStack justifyContent={"space-between"} p={"2"}>
                <Heading fontSize={"lg"}>All time high</Heading>
                <Text>
                  {currency_sym}
                  {coindetails.market_data.ath[currency]}
                </Text>
              </HStack>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

export default CoinDetails;
