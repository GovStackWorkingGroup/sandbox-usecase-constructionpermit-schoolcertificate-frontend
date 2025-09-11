import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Text
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Status } from "../../../../../../components/status/ApplicationStatus";
import { RPCContext } from "../../../../../../rpc/rpc";
import { Inquiry } from "../../../../../../rpc/types";
import OngoingPayment from "../components/OngoingPayment";
import PaymentSuccessful from "../components/PaymentSuccessful";
export default function BankPayment() {
  const { id } = useParams();
  const rpc = useContext(RPCContext);

  const [ongoingPayment, setOngoingPayment] = useState(false);
  const [successfulPayment, setSuccessfulPayment] = useState(false);

  const { data: inquiries } = useQuery(
    `inquiries`,
    rpc.getInquiries
  );

  const handlePayment = () => {
    setOngoingPayment(true);
    setTimeout(() => {
      const currentInquiry = inquiries?.find((inquiry) => inquiry.id === id) as Inquiry;
      if (inquiries && currentInquiry) {
        currentInquiry.action = "inReview";
        currentInquiry.status = Status.IN_REVIEW;
        rpc.forceSetData("inquiries", JSON.stringify([...inquiries.filter((inquiry) => inquiry.id != id), currentInquiry]));
      }
      setSuccessfulPayment(true);
    }, 4000);
  };
  if (successfulPayment) {
    return <PaymentSuccessful />;
  }
  if (ongoingPayment) {
    return <OngoingPayment />;
  }

  return (
    <>
      <Heading variant="headline">Payment</Heading>
      <Text>Inquiry #{id}</Text>
      <Flex flexDirection="column" gap="20px">
        <Flex maxWidth="400px" justifyContent="space-between" mb="10px">
          <Text>Fee Amount:</Text>
          <Text size="lg" variant="title">
            480 €
          </Text>
        </Flex>
        <Box>
          <Text>Name on Card</Text>
          <Input placeholder="Full Name" />
        </Box>
        <Box>
          <Text>Card Number</Text>
          <Input placeholder="xxxx xxxx xxxx xxxx" />
        </Box>
        <Flex gap="20px">
          <Box w="100%">
            <Text>Valid Thru</Text>
            <Input placeholder="MM / YY" />
          </Box>
          <Box w="100%">
            <Text>CVV</Text>
            <Input placeholder="xxx" />
          </Box>
        </Flex>
      </Flex>
      <Flex mt="auto" gap="10px" direction={{ base: "column", md: "row" }}>
        <Grid
          gap="10px"
          w="100%"
          gridAutoColumns={{ base: "100%", md: "50%" }}
          templateAreas={{
            base: `"a" "b"`,
            md: `"b a"`
          }}>
          <Button gridArea="a" colorScheme="admin" onClick={() => handlePayment()}>
            Pay Now
          </Button>
          <Button gridArea="b" as={RouterLink} to="../" colorScheme="info" variant="outline">
            Cancel
          </Button>
        </Grid>
      </Flex>
    </>
  );
}
