import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signUp } from 'aws-amplify/auth';
import { confirmSignUp, ConfirmSignUpInput } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsconfig from 'src/aws-exports';
import { api } from "src/utils/api";

Amplify.configure(awsconfig);

const SignUpForm: React.FC = () => {
  const { mutate: createUser } = api.user.create.useMutation({
    onSuccess: (data) => {
      console.log(data)
   },
  })

  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("")

  const handleSignUp = async ({ email, password }: { email: string, password: string }) => {
    try {
      const { userId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email
          },
          autoSignIn: true
        }
      });

      console.log(userId);
      // Provide user feedback here (e.g., success message)
      setSignUpSuccess(true);
    } catch (error) {
      console.log('error signing up:', error);
      // Handle and display errors to the user
    }
  };

  const handleConfirmation = async ({ email, code }: { email: string, code: string }) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: code
      });
      // Handle confirmation success
    } catch (error) {
      console.log('error confirming sign up:', error);
      // Handle and display errors to the user
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!signUpSuccess ? (
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log('Submitting form:', values);
            await handleSignUp(values);
            setUserEmail(values.email)
            setSubmitting(false);
            setSignUpSuccess(true)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field type="email" name="email" className="text-black"/>
              </div>
              <ErrorMessage name="email" component="div" />
              <div className="mb-4">
                <Field type="password" name="password" className="text-black"/>
              </div>
              <ErrorMessage name="password" component="div" />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ code: ''}}
          onSubmit={async (values, { setSubmitting }) => {
            console.log('Submitting confirmation form:', values);
            await handleConfirmation({ email: userEmail, code: values.code });
            createUser({email: userEmail})
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field type="text" name="code" className="text-black" placeholder="Enter the code received in your email" />
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SignUpForm;