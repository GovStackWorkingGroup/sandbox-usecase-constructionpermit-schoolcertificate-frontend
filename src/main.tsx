import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { Accordion } from "./chakra-overrides/Accordion";
import { Button } from "./chakra-overrides/Button";
import { Heading } from "./chakra-overrides/Heading";
import { Input } from "./chakra-overrides/Input";
import { List } from "./chakra-overrides/List";
import { Progress } from "./chakra-overrides/Progress";
import Tabs from "./chakra-overrides/Tabs";
import { Text } from "./chakra-overrides/Text";
import { colors } from "./chakra-overrides/colors";
import './i18n';
import "./index.css";
import { router } from "./routes/router";

const theme = extendTheme({
  colors,
  components: {
    Button: Button,
    Heading: Heading,
    Text: Text,
    Progress: Progress,
    Tabs: Tabs,
    List: List,
    Accordion: Accordion,
    Input: Input,
  },
  breakpoints: {
    xs: "200px",
    sm: "520px",
    md: "768px",
    lg: "991px",
    xl: "1240px",
    "2xl": "1300px",
  },
});

const queryClient = new QueryClient();

// on (re)load, check signed-id status
fetch(
  `${import.meta.env.VITE_API_ENDPOINT}/api/v1/rpc-data/data`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("token") ? (`Bearer ${sessionStorage.getItem("token")}`) : ("")
    },
    //local testing using token from .env - remember to update the token in .env every 24 hours
    // headers: {
    //   "Content-Type": "application/json",
    //   "authorization": import.meta.env.VITE_TOKEN_ENDPOINT // <-- your working token
    // },
    body: JSON.stringify({
      "tenant": "construction-permit",
      "key": "applications"
    }),
    signal: AbortSignal.timeout(5000)
  })
  .then(response => {
    if (response.status != 200) {
      sessionStorage.removeItem("token");
    }
  })
  .finally(() => {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </QueryClientProvider>
      </React.StrictMode>,
    )
  });
