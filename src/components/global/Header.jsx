import Link from 'next/link';

import { FaHome } from 'react-icons/fa';

const Header = () => {
	return (
		<header className="bg-gray-900 py-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/">
					<div className="text-white text-xl flex items-center">
						<FaHome className="mr-2" />
						Objectify
					</div>
				</Link>
			</div>
		</header>
	);
};

export default Header;
