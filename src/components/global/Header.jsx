// React & Next
import { useState } from 'react';
import Link from 'next/link';

// Icons
import { FaBars, FaHome, FaTimes } from 'react-icons/fa';

const HeaderMenuList = ['about', 'contact'];

function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	return (
		<header className="bg-white border-b px-4 py-4 md:px-6">
			<div className="container mx-auto flex justify-between items-center">
				<Link
					href="/"
					className="text-xl flex items-center font-bold text-gray-800 cursor-pointer"
				>
					<FaHome className="mr-2" />
					Objectify
				</Link>
				<div className="hidden md:block">
					<nav>
						<ul className="flex items-center">
							{HeaderMenuList.map((menu, _idx) => (
								<li className="ml-6" key={_idx}>
									<Link href={`${menu}`}>
										<div className="text-gray-600 hover:text-gray-800">
											{menu.charAt(0).toUpperCase() +
												menu.slice(1)}
										</div>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<div className="md:hidden">
					<button
						className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
						onClick={toggleMenu}
					>
						{isOpen ? (
							<FaTimes className="h-6 w-6" />
						) : (
							<FaBars className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden">
					<nav>
						<ul className="flex flex-col items-center">
							{HeaderMenuList.map((menu, _idx) => (
								<li className="mt-4" key={_idx}>
									<Link href={`${menu}`}>
										<div className="text-gray-600 hover:text-gray-800">
											{menu.charAt(0).toUpperCase() +
												menu.slice(1)}
										</div>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</header>
	);
}

export default Header;
