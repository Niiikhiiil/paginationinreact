import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

const App = () => {
	const [postData, setPostData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const recordPP = 5;
	const lastIndex = currentPage * recordPP;
	const firstIndex = lastIndex - recordPP;
	const npage = Math.ceil(postData?.length / recordPP);
	const numbers = [...Array(npage + 1).keys()].slice(1);
	const records =
		Array.isArray(postData) && postData?.slice(firstIndex, lastIndex);

	useEffect(() => {
		axios
			.get('https://jsonplaceholder.typicode.com/posts')
			.then((res) => setPostData(res.data));
	}, []);

	console.log(postData);

	const prevHandle = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	const changePageHandle = (n) => {
		setCurrentPage(n);
	};

	const nextHandle = () => {
		if (currentPage !== npage) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div>
			<div>
				<Table
					striped
					bordered
					hover
					variant="dark"
				>
					<thead>
						<tr>
							<th>ID</th>
							<th>TITLE</th>
							<th>DESCRIPTION</th>
							{/* <th>TAG</th> */}
						</tr>
					</thead>
					<tbody>
						{records?.map((post, i) => {
							return (
								<tr key={post.id}>
									<td>{post.id}</td>
									<td>{post.title}</td>
									<td>{post.body}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>

				<nav aria-label="Page navigation example">
					<ul className="pagination" >
						<li className="page-item" style={{textDecoration:"none",listStyle:"none"}}>
							<a onClick={prevHandle} className="page-link">Prev</a>
						</li>
						{numbers.map((num, i) => {
							return (
								<li key={i} className="page-item" style={{textDecoration:"none",listStyle:"none"}}>
									<a className="page-link"
										onClick={() => changePageHandle(num)}
									>
										{num}
									</a>
								</li>
							);
						})}
						<li className="page-item" style={{textDecoration:"none",listStyle:"none"}}>
							<a className="page-link" onClick={nextHandle}>Next</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default App;
