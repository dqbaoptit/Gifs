import React,{ useState,useEffect } from 'react';
import './App.css';
function App() {
  const [search,setSearch] = useState('');
  const [url,setUrl] = useState('https://api.giphy.com/v1/gifs/trending?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&limit=20&rating=G');
  const [query,setQuery] = useState('');
  const [gifs,setGifs] = useState([]);


  useEffect(() => {
    async function Fetch() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setGifs(json.data);
      } catch (error) { }
    };
    Fetch();
  },[url]);

  useEffect(() => {
    if (query !== "")
      setUrl(`https://api.giphy.com/v1/gifs/search?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&q=${query}&limit=25&offset=0&rating=G&lang=en`)
    else {
      setUrl(
        'https://api.giphy.com/v1/gifs/trending?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&limit=20&rating=G'
      )
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
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }
        }
        placeholder="Search GIF..." />
      <div>
        {gifs.map((gif,i) =>
          <div className="video">
            <video autoPlay={true} loop key={i} src={gif.images.fixed_height.mp4}> </video>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
