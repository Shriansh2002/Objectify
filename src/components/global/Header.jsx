import React from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

function Header() {
	return (
		<header className="bg-white shadow-md px-4 py-4 md:px-6 md:py-6">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/">
					<div className="text-xl flex items-center font-bold text-gray-800 cursor-pointer">
						<FaHome className="mr-2" />
						Objectify
					</div>
				</Link>
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
							<li className="ml-6">
								<Link href="/blog">
									<div className="text-gray-600 hover:text-gray-800">
										Blog
									</div>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<div className="md:hidden">
					<button className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none">
						<svg
							className="h-6 w-6"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
						>
							<path
								d="M4 6H20M4 12H20M4 18H20"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
