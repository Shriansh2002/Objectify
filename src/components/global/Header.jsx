import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaHome, FaTimes } from 'react-icons/fa';

function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	return (
		<header className="bg-white shadow-md px-4 py-4 md:px-6">
			<div className="container mx-auto flex justify-between items-center">
				<div
					className="text-xl flex items-center font-bold text-gray-800 cursor-pointer"
					onClick={() => {
						window.location.href = '/';
					}}
				>
					<FaHome className="mr-2" />
					Objectify
				</div>
				<div className="hidden md:block">
					<nav>
						<ul className="flex items-center">
							<li className="ml-6">
								<Link href="/about">
									<div className="text-gray-600 hover:text-gray-800">
										About
									</div>
								</Link>
							</li>
							<li className="ml-6">
								<Link href="/contact">
									<div className="text-gray-600 hover:text-gray-800">
										Contact
									</div>
								</Link>
							</li>
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
							<li className="mt-4">
								<Link href="/about">
									<div className="text-gray-600 hover:text-gray-800">
										About
									</div>
								</Link>
							</li>
							<li className="mt-4">
								<Link href="/contact">
									<div className="text-gray-600 hover:text-gray-800">
										Contact
									</div>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			)}
		</header>
	);
}

export default Header;
