import { SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface SearchProps {
  colorScheme: "admin" | "black";
}

export default function Search({ colorScheme }: SearchProps) {
  const { t } = useTranslation();
  return (
    <InputGroup>
      <Input placeholder={t('popular-services.search')} />
      <InputRightElement>
        <IconButton
          w="auto"
          aspectRatio="1/1"
          h="100%"
          colorScheme={colorScheme}
          icon={<SearchIcon />}
          aria-label={t('popular-services.search')}
        />
      </InputRightElement>
    </InputGroup>
  );
}
