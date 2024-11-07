import React from "react";
import { VStack, HStack, Box, Image, Heading, Text } from "@chakra-ui/react";
import { Formik, FormikHelpers, Form } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import FButton from "../components/FButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Définir un type pour les valeurs du formulaire
interface FormValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string().required("Mot de passe requis"),
});

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      console.log("URL API:", `${API_URL}/login`);
      const response = await axios.post(`${API_URL}/login`, payload);
      alert("Connexion réussie");
      console.log(response.data);
      navigate("/error404");
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          alert("Tous les champs sont requis.");
        } else if (status === 401) {
          if (data.message === "Invalid email") {
            alert("Email invalide.");
          } else if (data.message === "Invalid password.") {
            alert("Mot de passe incorrect.");
          }
        } else if (status === 500) {
          alert("Erreur du serveur, veuillez réessayer plus tard.");
        }
      } else {
        console.error("Erreur lors de la requête", error);
        alert("Erreur réseau. Veuillez vérifier votre connexion.");
      }
    }

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <HStack w="100vw" h="100vh">
            <VStack
              w={{ base: "100%", md: "55%" }}
              h="100vh"
              px={8}
              pb="180px"
              justifyContent="center"
              align="center"
            >
              <VStack
                w={{ base: "90%", md: "447px" }}
                h="404px"
                display="grid"
                gap="24px"
              >
                <Image src="Hector_Logo 1.png" />
                <Box>
                  <Heading>Connectez-vous</Heading>
                  <Text fontSize="md" color="gray.600">
                    Accédez à votre compte
                  </Text>
                </Box>

                <TextField
                  label="Email"
                  name="email"
                  placeholder="JohnDoe@gmail.com"
                  type="email"
                />
                <VStack display="flex" alignItems="flex-start">
                  <TextField
                    label="Mot de passe"
                    name="password"
                    type="password"
                    placeholder="- - - - - - - -"
                  />
                  <Text fontSize="smaller" color="gray.500">
                    Mot de passe oublié ?
                  </Text>
                </VStack>

                <FButton type="submit" variant="1">
                  Connexion
                </FButton>
              </VStack>
            </VStack>

            <Box w={{ base: "0", md: "45%" }} h="100vh">
              <Image src="Calque2.png" objectFit="cover" w="100%" h="100%" />
            </Box>
          </HStack>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
