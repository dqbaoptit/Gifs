import React,{ useState,useEffect } from 'react';
import './App.css';
import Seacher from './components/Searcher';
import Footer from './components/Footer';
import { Spin,Button,Modal,Empty } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const antIcon = <SyncOutlined style={{ fontSize: 120,color: "red" }} spin />;

function App() {
	const baseUrl = 'https://api.giphy.com/v1/gifs/trending?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&limit=12&rating=G';
	const [search,setSearch] = useState('');
	const [url,setUrl] = useState(baseUrl);
	const [query,setQuery] = useState('');
	const [gifs,setGifs] = useState([]);
	const [loading,setLoading] = useState(false);
	const [pagination,setPagination] = useState({
		limit: 12,
		offset: 0
	})
	const [hashtag,setHashtag] = useState('trending')
	useEffect(() => {
		async function Fetch() {
			setLoading(true);
			try {
				const response = await fetch(url);
				const json = await response.json();
				setGifs(json.data);
				setLoading(false);
			} catch
			(error) {
				setLoading(false)
			}
		};
		Fetch();
	},[url]);
	useEffect(() => {
		if (query !== '') {
			setUrl(`https://api.giphy.com/v1/gifs/search?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&q=${query}&limit=${pagination.limit}&offset=${pagination.offset}&rating=G&lang=en`)
			setHashtag(query)
		}
		else {
			setUrl(baseUrl)
			setHashtag('trending')
		}
	},[query,pagination.offset])

	useEffect(() => {
		const timeout = setTimeout(() => {
			setQuery(search)
		},200)
		return () =>
			clearTimeout(timeout)
	},[search])
	return (
		<div>
			<div align="center">
				<Seacher
					value={search}
					handleChange={(e) => { setSearch(e.target.value) }}
					holder="Search GIF..."
				/>
			</div>
			<div>
				<h3 style={{ color: "red" }}> #hashtag : {hashtag}</h3>
			</div>
			{loading ? <div align="center"><Spin indicator={antIcon} /></div> :
				<div className='body' align="center">
					{gifs.length === 0 && <Empty />}

					{(url !== baseUrl && gifs.length !== 0) &&
						<Button onClick={() => {
							if (pagination.offset !== 0) {
								let _offset = pagination.offset -= 10
								setPagination({
									...pagination,
									offset: _offset
								})
							}
							else {
								Modal.warning({
									title: 'At the first page',
								});
							}
						}}>
							Previous
						</Button>
					}
					<div>
						<div align="center" className='container'>
							<div className="container">
								{gifs.map((gif,i) =>
									<div key={i} className="video" style={{ margin: 2 }} >
										<video autoPlay loop src={gif.images.fixed_height.mp4} />
									</div>
								)}
							</div>
						</div>
					</div>
					<div>
						{(url !== baseUrl && gifs.length !== 0) &&
							<Button onClick={() => {
								let _offset = pagination.offset += 10
								setPagination({
									...pagination,
									offset: _offset
								})
							}}>
								Next
							</Button>
						}
					</div>
				</div>
			}
			<Footer />
		</div>

	)
}

export default App;
