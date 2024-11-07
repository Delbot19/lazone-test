import React from "react";
import { VStack, HStack, Box, Image, Heading, Text } from "@chakra-ui/react";
import FButton from "../components/FButton";
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();

  return (
    <HStack w="100vw" h="100vh" bg="primary">
      <VStack
        w={{ base: "100%", md: "55%" }}
        h="100vh"
        px={8}
        pl="180px"
        justifyContent="center"
        align="center"
      >
        <VStack
          w={{ base: "90%", md: "491px" }}
          h="404px"
          py="8px"
          display="grid"
          gap="24px"
        >
          <Text fontSize="14px" color="white">
            404 error
          </Text>
          <Image src="Hector_Logo2.png" w="300px" h="50px" />
          <Heading fontSize="39px" color="white" lineHeight="46px">
            Oups.. La page que vous recherchez n'est pas ici.
          </Heading>
          <Text fontSize="17px" lineHeight="28px" color="white">
            Cette page est peut-être ailleurs ou n'a peut-être jamais existé.
            Mais ne vous inquiétez pas, voici un chemin simple vers la page
            d'accueil où vous pourrez certainement retrouver votre chemin.
          </Text>
          <FButton type="button" variant="2" onClick={() => navigate("/")}>
            Retour à la page d'accueil
          </FButton>
        </VStack>
      </VStack>

      <Box
        display={{ base: "none", md: "grid" }} // Utilisation correcte
        w="45%"
        h="100vh"
        pt="300px"
        justifyContent="flex-end"
      >
        <Image src="Calque1.png" w="705px" />
      </Box>
    </HStack>
  );
}

export default Error404;
