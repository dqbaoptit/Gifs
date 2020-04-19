import React,{ useState,useEffect } from 'react';
import './App.css';
import Seacher from './components/Searcher';
import Footer from './components/Footer';
import { Spin,Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 200,color: "red" }} spin />;

function App() {
  const [search,setSearch] = useState('');
  const [url,setUrl] = useState('https://api.giphy.com/v1/gifs/trending?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&limit=32&rating=G');
  const [query,setQuery] = useState('');
  const [gifs,setGifs] = useState([]);
  const [loading,setLoading] = useState(false);

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
    if (query !== "")
      setUrl(`https://api.giphy.com/v1/gifs/search?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&q=${query}&limit=32&offset=0&rating=G&lang=en`)
    else {
      setUrl('https://api.giphy.com/v1/gifs/trending?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&limit=32&rating=G')
    }
  },[query])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(search)
    },200)
    return () =>
      clearTimeout(timeout)
  },[search])

  return (

    <div align='center'>
      <Seacher value={search} handleChange={(e) => { setSearch(e.target.value) }}
        holder="Search GIF..."
      />
      {loading ? <Spin indicator={antIcon} /> :
        <div className="container">
          {gifs.map((gif,i) =>
            <Card key={i} hoverable className="video" style={{ margin: 16 }} >
              <video autoPlay loop src={gif.images.fixed_height.mp4} />
            </Card>
          )}
        </div>
      }
      <Footer />
    </div>
  )
}

export default App;
