import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signUp } from 'aws-amplify/auth';
import { confirmSignUp, ConfirmSignUpInput } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsconfig from 'src/aws-exports';
import { signIn, type SignInInput } from 'aws-amplify/auth';


Amplify.configure(awsconfig);

async function handleSignIn({ username, password }: {username: string, password: string}) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log(nextStep)
    } catch (error) {
      console.log('error signing in', error);
    }
  }

const SignInForm: React.FC = () => {
  const [signInSuccess, setSignInSuccess] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            handleSignIn(values)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field type="email" name="username" className="text-black"/>
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
      
        
    </div>
  );
};

export default SignInForm;