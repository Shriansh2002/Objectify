// Next & React
import Head from 'next/head';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Components
import Footer from '@/components/global/Footer';
import Header from '@/components/global/Header';
import TableComponent from '@/components/TableComponent';
import ResultDownloadComponent from '@/components/ResultDownloadComponent';

// Tensorflow
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';


tf.setBackend('cpu');

const Prediction = () => {
    const router = useRouter();
    const { id } = router.query;

    // States
    const [imageUrl, setImageUrl] = useState(id);
    const [isLoading, setIsLoading] = useState(false);
    const [predictions, setPredictions] = useState([]);

    const coccoSsdPrediction = async (img) => {
        cocoSsd.load().then((model) => {
            model.detect(img).then((predictions) => {
                setIsLoading(false);

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                ctx.strokeStyle = '#00FF00';
                ctx.lineWidth = 2;
                ctx.font = 'bold 40px Arial';
                predictions.forEach((prediction) => {
                    ctx.beginPath();
                    ctx.rect(...prediction.bbox);
                    ctx.stroke();
                    ctx.fillStyle = '#00FF00';
                    ctx.fillText(
                        prediction.class +
                        ' (' +
                        (prediction.score * 100).toFixed(2) +
                        '%)',
                        prediction.bbox[0],
                        prediction.bbox[1] - 5
                    );
                });
                setImageUrl(canvas.toDataURL());

                setPredictions(predictions);
            });
        });
    };


    useEffect(() => {
        if (!imageUrl) {
            return;
        }

        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = imageUrl;

        setIsLoading(true);
        coccoSsdPrediction(image);

    }, []);


    return (
        <Fragment>
            <Head>
                <title>Prediction</title>
            </Head>

            <main className="flex flex-col min-h-screen justify-between">
                <Header />
                <div>
                    <div className="flex flex-col md:flex-row gap-8 py-12 mx-12 items-center justify-center">
                        <div className='flex items-center justify-center w-1/2'>
                            <img
                                src={imageUrl}
                                alt="Selected file"
                                className="rounded shadow-lg w-[350px] h-[300px] align-middle border-none "
                                crossOrigin="anonymous"
                            />
                        </div>
                        <div className='w-1/2'>
                            <h2 className="text-2xl font-bold mb-4 text-center">
                                PREDICTION
                            </h2>


                            <div>  {/* TODO: */}

                                {isLoading ? (
                                    <div className="flex justify-center">
                                        <div className="three-body">
                                            <div className="three-body__dot"></div>
                                            <div className="three-body__dot"></div>
                                            <div className="three-body__dot"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <TableComponent
                                            predictions={predictions}
                                        />
                                        {predictions.length > 0 &&
                                            <ResultDownloadComponent
                                                predictions={predictions}
                                            />
                                        }
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </Fragment>
    );
};

export default Prediction;