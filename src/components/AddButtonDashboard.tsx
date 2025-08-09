export default function AddButtonDashboard() {
	return (
		<div className="fixed bottom-0 right-0 z-10 py-4 rounded-2xl px-6 flex justify-end bg-white/50 dark:bg-gray-900/60 backdrop-blur-md mx-2 my-3">
			<button
				type="button"
				onClick={() => (window.location.href = "/dashboard/add")}
				className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-5 w-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
				Ajouter
			</button>
		</div>
	);
}
