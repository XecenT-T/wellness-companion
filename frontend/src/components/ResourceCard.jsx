import React from 'react'

export default function ResourceCard({res, onDownload}){
	return (
		<div className="card mb-3">
			<h3 className="text-lg font-semibold">{res.title}</h3>
			<div className="text-sm text-gray-600">{res.category}  {res.type}</div>
			<p className="mt-2 text-gray-700">{res.description}</p>
			<div className="mt-3 flex gap-2">
				<button onClick={()=>onDownload(res)} className="px-3 py-1 border rounded">Download</button>
				<button onClick={()=>alert('Open resource (demo)')} className="px-3 py-1 bg-deepBlue text-white rounded">Open</button>
			</div>
		</div>
	)
}