import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import React from "react";

export default function AccordionItem({
  title,
  children,
}: AccordionItemProps & { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <ChakraAccordionItem>
      {({ isExpanded }) => (
        <>
          <Heading as="h2" size="sm" variant="title">
            <AccordionButton gap="8px" style={{ font: "inherit" }} px="0">
              {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
              <Box as="span" flex="1" textAlign="left">
                {title}
              </Box>
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4} px="0">
            {children}
          </AccordionPanel>
        </>
      )}
    </ChakraAccordionItem>
  );
}
