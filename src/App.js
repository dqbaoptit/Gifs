import React,{ useState,useEffect,useRef } from 'react';

function App() {
  const [search,setSearch] = useState('');
  const [url,setUrl] = useState('https://api.giphy.com/v1/gifs/trending?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&limit=20&rating=G');
  const [query,setQuery] = useState('');
  const [gifs,setGifs] = useState([]);
  const typingTimeoutRef = useRef(null);

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
    if (query !== '')
      setUrl(`https://api.giphy.com/v1/gifs/search?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&q=${query}&limit=25&offset=0&rating=G&lang=en`)
    else
      setUrl('https://api.giphy.com/v1/gifs/trending?api_key=B3d73H94YDaNTZ3YVG2byUpCWmJvNnmN&limit=20&rating=G')
  },[query])


  console.log(search,query)
  return (
    <div align='center'>
      <form>
        <input
          value={search}
          onChange={(e) => {
            //debounce
            typingTimeoutRef.current = setTimeout(() => {
              setQuery(search)
            },100);
            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef);
            }
            setSearch(e.target.value);
          }
          }
          placeholder="Search GIF..." />
      </form>
      <div>
        {gifs.map((gif,i) =>
          <video autoPlay={true} loop key={i} src={gif.images.fixed_height.mp4}> </video>
        )}
      </div>
    </div>
  )
}

export default App;
