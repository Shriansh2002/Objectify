import React from 'react';

const SampleImagesCard = ({ image, _idx, handleSampleImageChange }) => {
	return (
		<div
			className="max-w-sm rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl"
			key={_idx}
			onClick={() => handleSampleImageChange(_idx)}
		>
			<img
				src={image.url}
				alt={image.name}
				className="w-full cursor-pointer h-52"
			/>
			<div className="px-6 pt-2 pb-1">
				<h2 className="font-bold text-xl mb-2">{image.name}</h2>
			</div>
		</div>
	);
};

export default SampleImagesCard;
