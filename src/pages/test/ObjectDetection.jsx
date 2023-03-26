// Next & React
import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

// Tensorflow
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';

tf.setBackend('cpu');

// Components
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';

const sampleImages = [
	{
		url: 'https://images.unsplash.com/photo-1679198315253-88c0b0b3f4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
		name: 'Sample 1',
	},
	{
		url: 'https://cdn.pixabay.com/photo/2016/02/19/15/46/labrador-retriever-1210559__480.jpg',
		name: 'Sample 2',
	},
	{
		url: 'https://images.unsplash.com/photo-1415604934674-561df9abf539?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80',
		name: 'Sample 3',
	},
	{
		url: 'https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
		name: 'Sample 4',
	},
];

const ObjectDetectionPage = () => {
	const [predictions, setPredictions] = useState([]);
	const [imageUrl, setImageUrl] = useState();
	const [isLoading, setIsLoading] = useState(false);

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

	const handleImageChange = (e) => {
		setPredictions([]);
		setIsLoading(true);
		const selectedFile = e.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			const img = new Image();
			img.src = reader.result;

			img.onload = () => {
				setImageUrl(URL.createObjectURL(selectedFile));
				coccoSsdPrediction(img);
			};
		};

		reader.readAsDataURL(selectedFile);
	};

	const handleSampleImageChange = (index) => {
		setPredictions([]);
		setIsLoading(true);
		const selectedImage = sampleImages[index];
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.src = selectedImage.url;
		img.onload = () => {
			setImageUrl(selectedImage.url);
			coccoSsdPrediction(img);
		};
	};

	const downloadJSON = () => {
		const jsonData = JSON.stringify(predictions);
		const blob = new Blob([jsonData], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.download = 'predictions.json';
		a.href = url;
		a.click();
		URL.revokeObjectURL(url);
	};

	const convertAndDownloadCSV = () => {
		const csvData = predictions.map((prediction) => {
			return {
				className: prediction.class,
				confidence: prediction.score,
			};
		});

		const csvContent =
			'data:text/csv;charset=utf-8,' +
			csvData
				.map((e) => {
					return Object.values(e).join(',');
				})
				.join('\n');

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', 'predictions.csv');
		document.body.appendChild(link); // Required for FF

		link.click();
	};

	const convertAndDownloadXML = () => {
		const xmlData = predictions.map((prediction) => {
			return {
				className: prediction.class,
				confidence: prediction.score,
			};
		});

		const xmlContent =
			'data:text/xml;charset=utf-8,' +
			xmlData
				.map((e) => {
					return Object.values(e).join(',');
				})
				.join('\n');

		const encodedUri = encodeURI(xmlContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', 'predictions.xml');
		document.body.appendChild(link); // Required for FF

		link.click();
	};

	return (
		<>
			<Head>
				<title>Objectify - Object Detection</title>

				<Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core" />
				<Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter" />
				<Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl" />
				<Script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose" />
			</Head>

			<main className="flex flex-col min-h-screen justify-between">
				<Header />

				<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
					{imageUrl ? (
						<div>
							<div className="flex gap-8 items-center justify-center">
								<img
									src={imageUrl}
									alt="Selected file"
									className="rounded-xl shadow-lg w-[350px] h-[300px] align-middle border-none "
									crossOrigin="anonymous"
								/>
								<div>
									<h2 className="text-2xl font-bold mb-4 text-center">
										PREDICTION
									</h2>

									{isLoading ? (
										<div className="flex justify-center">
											<p>Loading...</p>
										</div>
									) : (
										<div>
											<table className="min-w-full divide-y divide-gray-200 border-gray-200 border">
												<thead className="bg-gray-50">
													<tr>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300"
														>
															ClassName
														</th>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300"
														>
															Confidence
														</th>
													</tr>
												</thead>
												<tbody className="bg-white divide-y divide-gray-200 ">
													{predictions.length > 0 ? (
														predictions.map(
															(prediction, i) => (
																<tr key={i}>
																	<td className="px-6 py-4 whitespace-nowrap border border-gray-300">
																		{
																			prediction.class
																		}
																	</td>
																	<td className="px-6 py-4 whitespace-nowrap border border-gray-300">
																		{Math.round(
																			parseFloat(
																				prediction.score
																			) *
																				100
																		)}
																		%
																	</td>
																</tr>
															)
														)
													) : (
														<tr>
															<td className="px-6 py-4 whitespace-nowrap border border-gray-300">
																No predictions
															</td>
															<td className="px-6 py-4 whitespace-nowrap border border-gray-300">
																No predictions
															</td>
														</tr>
													)}
												</tbody>
											</table>
											<div className="flex justify-center mt-4">
												<button
													className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
													onClick={downloadJSON}
												>
													Download JSON
												</button>

												<button
													className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
													onClick={
														convertAndDownloadCSV
													}
												>
													Download CSV
												</button>

												<button
													className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
													onClick={
														convertAndDownloadXML
													}
												>
													Download XML
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					) : (
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

							<div className="mt-8">
								<span className="text-gray-700 text-xl font-bold mb-4">
									Select a sample image
								</span>
								<div className="flex gap-4 mt-4">
									{sampleImages.map((image, _idx) => (
										<button
											key={_idx}
											className="bg-white border-orange-400 border-2 px-4 py-0.5 text-orange-400 hover:bg-orange-400 hover:text-white rounded"
											onClick={() =>
												handleSampleImageChange(_idx)
											}
										>
											{image.name}
										</button>
									))}
								</div>
							</div>
						</div>
					)}
				</div>

				<Footer />
			</main>
		</>
	);
};

export default ObjectDetectionPage;
