import React from 'react';

export default function TableComponent({ predictions }) {
	return (
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
					predictions.map((prediction, i) => (
						<tr key={i}>
							<td className="px-6 py-4 whitespace-nowrap border border-gray-300">
								{prediction.class}
							</td>
							<td className="px-6 py-4 whitespace-nowrap border border-gray-300">
								{Math.round(parseFloat(prediction.score) * 100)}
								%
							</td>
						</tr>
					))
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
	);
}
