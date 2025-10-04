const Sidebar = () => {
	return (
		<aside className="h-[90vh] w-64 bg-gray-900 text-white flex flex-col p-4 rounded-2xl shadow-lg m-6">
			<h2 className="text-2xl font-bold mb-6 text-center">Vale do Taquari</h2>
			<nav className="flex flex-col space-y-4">
				<div className="bg-gray-800 rounded-xl p-3 hover:bg-gray-700 transition">
					<a href="#" className="flex items-center space-x-3">
						<span>Clima</span>
					</a>
				</div>
				<div className="bg-gray-800 rounded-xl p-3 hover:bg-gray-700 transition">
					<a href="#" className="flex items-center space-x-3">
						<span>Precipitação</span>
					</a>
				</div>
				<div className="bg-gray-800 rounded-xl p-3 hover:bg-gray-700 transition">
					<a href="#" className="flex items-center space-x-3">
						<span>Solo</span>
					</a>
				</div>
			</nav>
		</aside>
	);
};

export default Sidebar;
