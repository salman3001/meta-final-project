import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";


const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen,isOpen,type,message } = useAlertContext();


  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",  
      type: "",
      comment: ""
    },
    onSubmit: (values) => {
      if (formik.isValid) {
  
      submit("",values)
      onOpen(response.type,response.message)  
      }
      return
  
   },
    validationSchema: Yup.object({
      firstName: Yup.string().required("required"),
      email: Yup.string().email("not valid email").required("required"),
      type: Yup.string(),
      comment: Yup.string().min(25, "must be atleast 25 charectors").required("required")

    })
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={e=>{e.preventDefault(); formik.handleSubmit()}}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName ? true:false} >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.touched.email && formik.errors.email ?true:false }>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.type && formik.errors.comment? true : false}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                {isLoading?
                  <> <Spinner p={2}/>Submitting</>:"Submit"}

                
                
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>

    </FullScreenSection>
  );
};

export default LandingSection;
