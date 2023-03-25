// Next & React
import Head from 'next/head';
import React, { useRef, useState } from 'react';

// Icons
import { BsSearch } from 'react-icons/bs';

// Components
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';

// Tensorflow
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';

const ImageClassification = () => {
	const [image, setImage] = useState(null);
	const [predictions, setPredictions] = useState([]);
	const [loading, setLoading] = useState(false);
	const imageRef = useRef();

	const classifyImage = async () => {
		setLoading(true);
		const model = await mobilenet.load();
		const predictions = await model.classify(imageRef.current);
		setPredictions(predictions);
		setLoading(false);
	};

	const handleFileUpload = (event) => {
		const { files } = event.target;
		if (files && files.length) {
			const url = URL.createObjectURL(files[0]);
			setImage(url);
		}
	};

	return (
		<>
			<Head>
				<title>Image Classification</title>
				<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>
				<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></script>
				<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl"></script>
				<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose"></script>
			</Head>

			<main className="flex flex-col min-h-screen justify-between">
				<Header />

				<div className="flex flex-col items-center">
					<h1 className="text-3xl font-bold text-center mb-2 p-2">
						Image Classification with TensorFlow.js and MobileNet
					</h1>

					<input
						type="file"
						accept="image/*"
						onChange={handleFileUpload}
						id="file-upload"
						className="sr-only hidden"
						placeholder="Select an image to classify"
					/>

					<label
						htmlFor="file-upload"
						className="px-4 py-2 text-lg font-bold rounded-lg cursor-pointer 
							text-white bg-orange-500 hover:bg-orange-600"
					>
						Upload
					</label>
				</div>

				<div className="flex items-center gap-2 justify-center p-12">
					<div className="w-1/2">
						{image && (
							<div className="flex flex-col items-center">
								<img
									ref={imageRef}
									src={image}
									alt="Selected"
									className="mt-4 mb-8 w-64 h-64 object-cover rounded-lg shadow-md"
								/>
								<button
									onClick={classifyImage}
									className={`px-4 py-2 flex items-center justify-center gap-1 text-lg font-medium text-white rounded-lg w-64 ${
										loading
											? 'bg-gray-500 cursor-not-allowed'
											: 'bg-orange-500 hover:bg-orange-600'
									}`}
									disabled={loading}
								>
									{loading ? (
										<div className="w-6 h-6 border-2 border-t-2 rounded-full animate-spin"></div>
									) : (
										<>
											Classify <BsSearch />
										</>
									)}
								</button>
							</div>
						)}
					</div>
					<div className="w-1/2">
						{predictions.length > 0 && (
							<div className="rounded-lg p-12">
								<table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
									<thead className="text-xs text-gray-700 uppercase bg-gray-50">
										<tr>
											<th className="px-4 py-2">
												Class Name
											</th>
											<th className="px-4 py-2">
												Probability
											</th>
										</tr>
									</thead>
									<tbody>
										{predictions.map((prediction, _idx) => (
											<tr
												key={_idx}
												className="bg-white border-b"
											>
												<td className="border px-4 py-2">
													{prediction.className}
												</td>
												<td className="border px-4 py-2">
													{Math.round(
														prediction.probability *
															100
													)}
													%
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>

				<Footer />
			</main>
		</>
	);
};

export default ImageClassification;
