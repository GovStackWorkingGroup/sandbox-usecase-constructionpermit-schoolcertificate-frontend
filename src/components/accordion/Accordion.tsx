import { Accordion as ChakraAccordion, AccordionProps } from "@chakra-ui/react";

export default function Accordion({ children }: AccordionProps) {
  return <ChakraAccordion allowMultiple>{children}</ChakraAccordion>;
}
