// Next & React
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';


// Components
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import SampleImagesCard from '@/components/SampleImagesCard';

// Data
import sampleImages from '@/data/sampleImages';

// Fonts
import {
  Roboto
} from 'next/font/google';

const roboto = Roboto({
  weight: ['400'],
  subsets: ['latin'],
});

const ObjectDetectionPage = () => {
  const router = useRouter();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);

    router.push(`/prediction/${encodeURIComponent(imageUrl)}`);
  };

  const handleSampleImageChange = (index) => {
    const selectedImage = sampleImages[index];
    router.push(`/prediction/${encodeURIComponent(selectedImage.url)}`);
  };

  return (
    <>
      <Head>
        <title>Objectify - Object Detection</title>
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core" />
      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter" />
      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl" />
      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose" />

      <main className="flex flex-col min-h-screen justify-between">
        <Header />

        <div className={`max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 ${roboto.className} `}>
          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-700 mb-4 text-xl font-bold">
              Upload an image
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 focus:border-gray-400"
            />

            <div className="flex items-center mt-8">
              <div className="mx-3 text-gray-400">OR</div>
            </div>


            {/* TODO:  Add image URL input */}
            {/* <div className="flex w-full">
              <input
                type="text"
                placeholder="Paste image URL"
                className="w-full h-12 py-3 px-4 rounded-lg bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 focus:border-gray-400"
              />

              <button
                className='h-12 w-fit rounded-lg bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 focus:border-gray-400'
              >
                Detect Objects
              </button>
            </div>

            <div className="flex items-center mt-8">
              <div className="mx-3 text-gray-400">OR</div>
            </div> */}

            <div className="mt-8">
              <p className="text-gray-700 text-xl font-bold mb-6">
                Select a sample image
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {sampleImages.map((image, _idx) => (
                  <SampleImagesCard
                    image={image}
                    _idx={_idx}
                    handleSampleImageChange={handleSampleImageChange}
                    key={_idx}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main >
    </>
  );
};

export default ObjectDetectionPage;
