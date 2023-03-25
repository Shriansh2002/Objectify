// Next & React
import Head from 'next/head';
import React, { useRef, useState } from 'react';

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
	const imageRef = useRef();

	const classifyImage = async () => {
		const model = await mobilenet.load();
		const predictions = await model.classify(imageRef.current);
		setPredictions(predictions);
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
							text-white bg-blue-500 hover:bg-blue-600"
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
									className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 w-64 "
								>
									Classify Image
								</button>
							</div>
						)}
					</div>
					<div className="w-1/2">
						{predictions.length > 0 && (
							<div className="bg-gray-100 rounded-lg p-12">
								<h2 className="text-lg font-bold mb-2">
									Results:
								</h2>
								<table className="table-auto">
									<thead>
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
										{predictions.map(
											(prediction, index) => (
												<tr
													key={prediction.className}
													className={
														index % 2 === 0
															? 'bg-gray-200'
															: ''
													}
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
											)
										)}
									</tbody>
								</table>
								<div className="my-4"></div>
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
