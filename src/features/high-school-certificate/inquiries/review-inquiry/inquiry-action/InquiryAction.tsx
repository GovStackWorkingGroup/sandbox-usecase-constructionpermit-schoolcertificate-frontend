import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Spinner,
} from "@chakra-ui/react";
import SuccessfullyCompleted from "./Successfullly-Completed";

export default function InquiryAction({
  applicationId,
}: {
  applicationId?: string;
}) {
  const feeAmount = 5.5; // hardcoded
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const inquiry = JSON.parse(localStorage.getItem("inquiry") || "{}");

  const isFormValid =
    nameOnCard.trim() !== "" &&
    cardNumber.trim() !== "" &&
    expiry.trim() !== "" &&
    cvv.trim() !== "";

  const handlePayNow = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true); // show the success screen
    }, 2500);
  };

  if (loading) {
    return (
      <Flex direction="column" align="center" justify="center" h="250px" gap={4}>
        <Spinner size="lg" color="blue.500" />
        <Text fontWeight="semibold">Receiving payment order...</Text>
        <Text fontSize="sm" color="gray.500">
          Please wait! This process might take some time.
        </Text>
      </Flex>
    );
  }

  // After payment, render the success component (with Continue -> feedback)
  if (paid) {
    return <SuccessfullyCompleted applicationId={inquiry.id ?? applicationId} />;
  }

  // Payment form
  return (
    <Flex mt="10rem" w="100%" direction={{ base: "column", md: "row" }}>
      <Box maxW="400px" mx="auto" p={4} borderWidth="1px" borderRadius="lg" bg="white" mt="-7rem">
        <Text fontSize="sm" color="gray.500">
          Application ID {applicationId}
        </Text>

        <Flex justify="space-between" align="center" my={3}>
          <Text fontWeight="semibold">Fee Amount:</Text>
          <Text fontWeight="semibold">{feeAmount.toFixed(2)} €</Text>
        </Flex>

        <FormControl mb={3}>
          <FormLabel fontSize="sm">Name on Card</FormLabel>
          <Input
            placeholder="Full Name"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel fontSize="sm">Card Number</FormLabel>
          <Input
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </FormControl>

        <Flex gap={3}>
          <FormControl>
            <FormLabel fontSize="sm">Valid Thru</FormLabel>
            <Input
              placeholder="MM / YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">CVV</FormLabel>
            <Input
              placeholder="XXX"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </FormControl>
        </Flex>

        <Flex direction="column" mt={4} gap={2}>
          <Button colorScheme="blue" onClick={handlePayNow} isDisabled={!isFormValid}>
            Pay Now
          </Button>
          <Button variant="outline" colorScheme="info" onClick={() => window.history.back()}>
            Cancel
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
