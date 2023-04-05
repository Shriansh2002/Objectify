import React from 'react';

const SampleImagesCard = ({ image, _idx, handleSampleImageChange }) => {
	return (
		<div
			className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl"
			key={_idx}
		>
			<img
				src={image.url}
				alt="Loading..."
				className="w-full h-52 cursor-pointer"
			/>
			<div className="px-6 py-4">
				<button
					target="_blank"
					rel="noreferrer"
					className="w-full relative inline-flex items-center justify-center py-2 px-4 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded shadow-xl group hover:ring-1 hover:ring-purple-500"
					onClick={() => handleSampleImageChange(_idx)}
				>
					<span className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700"></span>
					<span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded opacity-30 group-hover:rotate-90 ease"></span>
					<span className="relative text-white">Select</span>
				</button>
			</div>
		</div>
	);
};

export default SampleImagesCard;
