import { Signer } from "aws-sdk";
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignUpForUpdates: React.FC = ({}) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    return (
        <div className="h-screen grid place-items-center">
            <div className="grid grid-rows-3 gap-4 text-center">
                <div>
                    <img src=""/>
                </div>
                <div>
                    <p>Streez wants you to support them on Scratch! </p>
                </div>
                <div>
                    <p>By signing up for text blasts, you'll show people trying to book Streez that real people are supporting them!</p>
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        View Streez's Profile
                    </button>
                </div>

            <Formik
                initialValues={{phoneNumber: ''}} 
                onSubmit={(values) => {
                    console.log(values.phoneNumber)
                    setIsSubmitting(true)
                }}>

    <Form>
    <div className="mb-4">
        <Field type="phone" name="phone" className="text-black">

        </Field>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitted!' : 'Submit'}
              </button>
    </Form>
            </Formik>
                
            </div>
        </div>
    );
}

export default SignUpForUpdates;