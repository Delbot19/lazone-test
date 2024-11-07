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
  nom: string;
  prenom: string;
  email: string;
  password: string;
  repeatpassword: string;
}

const registerSchema = Yup.object().shape({
  nom: Yup.string().required("Nom requis"),
  prenom: Yup.string().required("Prénom requis"),
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string()
    .required("Mot de passe requis")
    .min(8, "Le mot de passe est trop court")
    .test(
      "has-uppercase",
      "Le mot de passe doit contenir au moins une lettre majuscule",
      (value) => /[A-Z]/.test(value || ""),
    )
    .test(
      "has-lowercase",
      "Le mot de passe doit contenir au moins une lettre minuscule",
      (value) => /[a-z]/.test(value || ""),
    )
    .test(
      "has-number",
      "Le mot de passe doit contenir au moins un chiffre",
      (value) => /[0-9]/.test(value || ""),
    )
    .test(
      "has-special-char",
      "Le mot de passe doit contenir au moins un caractère spécial",
      (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value || ""),
    ),
  repeatpassword: Yup.string()
    .required("Veuillez répéter le mot de passe")
    .oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre"),
});

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const payload = {
      username: `${values.nom} ${values.prenom}`,
      email: values.email,
      password: values.password,
    };

    try {
      console.log("URL API:", `${API_URL}/register`);
      const response = await axios.post(`${API_URL}/register`, payload);
      alert("Inscription réussie");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      alert("Une erreur est survenue lors de l'inscription");
    }

    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        nom: "",
        prenom: "",
        email: "",
        password: "",
        repeatpassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <HStack w="100vw" h="100vh">
            <VStack
              w={{ base: "100%", md: "55%" }}
              h="100vh"
              px={8}
              justifyContent="center"
              align="center"
            >
              <Box
                w={{ base: "90%", md: "447px" }}
                h="562px"
                display="grid"
                gap="16px"
              >
                <Image src="Hector_Logo 1.png" />
                <Box>
                  <Heading>Inscrivez-vous</Heading>
                  <Text fontSize="md" color="gray.600">
                    Créez votre compte
                  </Text>
                </Box>

                <HStack w="100%">
                  <TextField label="Nom" name="nom" placeholder="Doe" />
                  <TextField label="Prénom" name="prenom" placeholder="John" />
                </HStack>
                <TextField
                  label="Email"
                  name="email"
                  placeholder="JohnDoe@gmail.com"
                  type="email"
                />
                <TextField
                  label="Mot de passe"
                  name="password"
                  type="password"
                  placeholder="- - - - - - - -"
                  helperText="(8 caractères minimum)"
                />
                <TextField
                  label="Répéter le mot de passe"
                  name="repeatpassword"
                  type="password"
                  placeholder="- - - - - - - -"
                />
                <FButton type="submit" variant="1">
                  S'enregistrer
                </FButton>
              </Box>
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

export default Register;
// https://app.screencastify.com/v3/watch/wOsfAJA9m3plRc8MoXFG
