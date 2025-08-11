import {
  Box,
  Flex,
  HStack,
  Spacer,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../../chakra-overrides/colors";

function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Flex
        {...checkbox}
        minW="3rem"
        minH="3rem"
        margin="10px"
        cursor="pointer"
        fontWeight="semibold"
        alignItems="center"
        justifyContent="center"
        borderWidth="1px"
        borderColor={colors.theme.primary}
        textColor={colors.theme.primary}
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: colors.theme.primary,
          color: "white",
          borderColor: colors.theme.primary,
        }}
        p="5px"
      >
        {props.children}
      </Flex>
    </Box>
  );
}

export default function FeedbackRatingRadio() {
  const { t } = useTranslation();
  const options = ["1", "2", "3", "4", "5"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "feedbackRating",
  });

  const group = getRootProps();

  return (
    <Flex direction="column">
      <Flex>
        <HStack {...group} justifyContent="center">
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            );
          })}
        </HStack>
      </Flex>
      <Flex direction="row" px="10px">
        <Text color="gray">{t('application.feedback.labels.not-satisfied')}</Text>
        <Spacer />
        <Text color="gray">{t('application.feedback.labels.satisfied')}</Text>
      </Flex>
    </Flex>
  );
}
