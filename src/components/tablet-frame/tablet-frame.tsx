import React from "react";
import { Box } from "@chakra-ui/react";

export const TabletFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box
        minH="100vh"
        minW="100vw"
        bg="#ece8e1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
            background:
                "repeating-linear-gradient(135deg, #ece8e1, #ece8e1 40px, #e2dfd5 60px, #ece8e1 80px)",
        }}
    >
        <Box
            border="20px solid #222"         // You can use gold/brown if you want
            borderRadius="38px"
            boxShadow="0 8px 40px #0007, 0 1px 8px #fff7 inset"
            bg="#fff"
            width={["100vw", "80vw"]}
            maxW="1600px"
            height={["100vh", "1020px"]}      // Slightly taller
            maxH="98vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            position="relative"
            overflow="hidden"
        >
            {/* Optional inner shadow */}
            <Box
                position="absolute"
                inset="0"
                borderRadius="30px"
                boxShadow="inset 0 0 38px 12px #bbb6"
                pointerEvents="none"
                zIndex={1}
            />
            {/* Content */}
            <Box
                position="relative"
                zIndex={2}
                width="100%"
                height="100%"
                p={[2, 6]}   // More padding for the wider frame
                overflowY="auto"
                display="flex"
                flexDirection="column"
            >
                {children}
            </Box>
        </Box>
    </Box>
);
