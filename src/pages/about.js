import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Components
import Footer from '@/components/global/Footer';
import Header from '@/components/global/Header';

// Icons
import { FaGithub } from 'react-icons/fa';

const AboutPage = () => {
    return (
        <Fragment>
            <Head>
                <title>About - Objectify</title>
            </Head>

            <main className="flex flex-col min-h-screen justify-between">
                <Header />
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto py-16 sm:py-24">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                About Our {""}
                                <span className='text-indigo-600'>
                                    Objectify
                                </span>
                            </h2>
                            <p className="mt-6 text-xl text-gray-500">
                                Our TensorflowJS Object Detection App uses machine learning algorithms to detect objects from an image. It is built using NextJS and TailwindCSS.
                            </p>
                            <p className="mt-6 text-xl text-gray-500">
                                This application is designed to help users identify objects in images using state-of-the-art machine learning models. Our goal is to make it easy for everyone to leverage the power of machine learning and AI to solve real-world problems.
                            </p>
                            <p className="mt-6 text-xl text-gray-500">
                                To learn more about the technologies we used to build this application, please check out our Github repository:
                            </p>
                            <div className="mt-8">
                                <Link
                                    href="https://github.com/shriansh2002/objectify"

                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                    rel="noopener noreferrer" target="_blank"
                                >
                                    <FaGithub className="mr-2" />
                                    Github Repository

                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </Fragment>
    );
};

export default AboutPage;