import HomeIcon from "@assets/icons/home.svg?react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
type BreadcrumbElement = [string, string | null];
export type BreadcrumbPaths = BreadcrumbElement[];

interface BreadcrumbsProps {
  path: BreadcrumbPaths;
}

const getBreadcrumbLinkProps = (path: string | null) => {
  if (path) {
    return {
      href: path,
    };
  }
  return;
};

export default function Breadcrumbs({ path = [] }: BreadcrumbsProps) {
  return (
    <Box w="100%" mb="40px">
      <Breadcrumb
        listProps={{ flexWrap: "wrap" }}
        spacing="0px"
        w="100%"
        separator={<ChevronRightIcon />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink padding="12px 6px" as={RouterLink} to="/">
            <HomeIcon />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {path.map(([title, pathname], index) => (
          <BreadcrumbItem key={title}
          display={{base: (index > (path.length - 4)?"flex":"none"), md: "flex"}}
          >
            <BreadcrumbLink
              padding="12px 6px"
              {...getBreadcrumbLinkProps(pathname)}
            >
              <Text display={{base: (index == path.length - 1 || index == path.length - 2)?"flex":"none", md: "flex"}}>{title}</Text>
              <Text display={{base: (index == (path.length - 3)?"flex":"none"), md: "none"}}>&#8230;</Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Box>
  );
}
