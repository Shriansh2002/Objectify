export default function ResultDownloadComponent({ predictions }) {
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
		<div className="flex justify-center mt-4">
			<button
				className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
				onClick={downloadJSON}
			>
				Download JSON
			</button>

			<button
				className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
				onClick={convertAndDownloadCSV}
			>
				Download CSV
			</button>

			<button
				className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
				onClick={convertAndDownloadXML}
			>
				Download XML
			</button>
		</div>
	);
}
