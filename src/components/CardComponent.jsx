import React from 'react';
import Link from 'next/link';

const CardComponent = ({ card: { title, description, link, imageUrl } }) => {
	return (
		<Link href={`test/${link}`}>
			<div className="mx-12 md:mx-0 group block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300 ease-in-out max-w-lg md:max-w-xs">
				<div className="relative h-44 overflow-hidden">
					<img
						className="object-cover absolute inset-0 w-full h-full transform group-hover:scale-110 transition duration-500 ease-in-out"
						src={imageUrl}
						alt={title}
					/>
				</div>
				<hr />
				<div className="px-4 py-5 sm:p-6 group-hover:text-white group-hover:bg-orange-500">
					<div className="flex items-center justify-between">
						<p className="text-lg font-medium truncate">{title}</p>
					</div>
					<div className="mt-4">
						<div className="flex items-center">
							<div className="text-md">{description}</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CardComponent;
