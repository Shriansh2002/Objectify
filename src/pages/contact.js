import Head from 'next/head';
import { Fragment } from 'react';

// Components
import Footer from '@/components/global/Footer';
import Header from '@/components/global/Header';

// Icons
import { FaEnvelope, FaPhone } from "react-icons/fa";

const ContactPage = () => {
    return (
        <Fragment>

            <Head>
                <title>Contact - Objectify</title>
            </Head>

            <main className="flex flex-col min-h-screen justify-between">
                <Header />

                <div className="bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto py-16 sm:py-24">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                                Contact Us
                            </h2>
                            <p className="mt-6 text-xl text-gray-500 dark:text-gray-300">
                                If you have any questions or feedback, please don{""}t hesitate to get in touch with us. You can contact either of us using the details below:
                            </p>



                        </div>
                    </div>
                </div>

                <Footer />

            </main>
        </Fragment >
    );
};

export default ContactPage;
