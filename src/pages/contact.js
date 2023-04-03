import Head from 'next/head';
import { Fragment } from 'react';

// Components
import Footer from '@/components/global/Footer';
import Header from '@/components/global/Header';

// Icons


const ContactPage = () => {
    return (
        <Fragment>

            <Head>
                <title>Contact - Objectify</title>
            </Head>

            <main className="flex flex-col min-h-screen justify-between">
                <Header />


                <section className="flex-grow bg-gray-100 py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>

                        <form className='bg-white mx-auto max-w-2xl shadow-md rounded-lg  px-8 py-12'>
                            <div className="mb-6">
                                <label
                                    for="email"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="Enter Your Name"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    for="name"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="Enter Your Email"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    for="large-input"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    type="text"
                                    id="large-input"
                                    className="block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
                                    placeholder="Enter your message"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full"
                            >
                                Send
                            </button>
                        </form>
                    </div>

                </section>

                <Footer />

            </main>
        </Fragment >
    );
};

export default ContactPage;
