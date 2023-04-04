import Head from 'next/head';
import { Fragment, useEffect } from 'react';

// Components
import Footer from '@/components/global/Footer';
import Header from '@/components/global/Header';


const ContactPage = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
                    formId: process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID,
                    target: '#hubspotForm'
                });
            }
        });
    }, []);

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

                        <div className='p-16 bg-white rounded-lg shadow-lg'>
                            <div id="hubspotForm"></div>
                        </div>


                    </div>

                </section>

                <Footer />

            </main>
        </Fragment >
    );
};

export default ContactPage;
