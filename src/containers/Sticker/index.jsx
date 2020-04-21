import React,{ useState,useEffect } from 'react';
import Footer from '../../components/Footer';
import Searcher from '../../components/Searcher';
import Loading from '../../components/Loading';
import { Empty,Button,Modal } from 'antd';
import Navbar from '../../components/Navbar';
export default () => {
    const baseUrl = 'https://api.giphy.com/v1/stickers/trending?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&limit=18&rating=G';
    const [search,setSearch] = useState('');
    const [url,setUrl] = useState(baseUrl);
    const [query,setQuery] = useState('');
    const [sticker,setSticker] = useState([]);
    const [loading,setLoading] = useState(false);
    const [pagination,setPagination] = useState({
        limit: 18,
        offset: 0,
    })
    const [hashtag,setHashtag] = useState('treding');

    useEffect(() => {
        async function Fetch() {
            setLoading(true);
            try {
                const response = await fetch(url);
                const json = await response.json();
                setSticker(json.data);
                setLoading(false);
            }
            catch (error) {
                setLoading(false);
            }
        }
        Fetch();
    },[url])
    useEffect(() => {
        if (query !== '') {
            setUrl(`https://api.giphy.com/v1/stickers/search?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&q=${query}&limit=${pagination.limit}&offset=${pagination.offset}&rating=G&lang=en`)
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
        return () => {
            clearTimeout(timeout)
        }
    },[search])
    return (
        <React.Fragment>
            <Navbar />
            <div align="center">
                <Searcher
                    value={search}
                    handleChange={e => { setSearch(e.target.value) }}
                    holder="Search Sticker..."
                />
            </div>
            <div>
                <h3 style={{ color: "red" }}> #hashtag : {hashtag}</h3>
            </div>
            {loading ? <Loading /> :
                <div className="body" align="center">
                    {sticker.length === 0 && <Empty />}
                    {(url !== baseUrl && sticker.length !== 0) &&
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
                    <div align="center">
                        <div className="container">
                            {sticker.map((sticker,i) => {
                                return (
                                    <div key={i} className="item" style={{ margin: 2 }} >
                                        <img src={sticker.images.fixed_height.url} />
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                    {(url !== baseUrl && sticker.length !== 0) &&
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
            }
            <Footer />
        </React.Fragment>

    )
}