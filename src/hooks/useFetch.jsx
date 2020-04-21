import { useState,useEffect } from 'react';

export default function Fetch(url) {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        async function callAPI() {
            setLoading(true);
            try {
                const res = await fetch(url);
                const json = await res.json();
                setData(json.data);
                setLoading(false);
            }
            catch (error) {
                setLoading(false)
            }
        };
        callAPI();
    },[url]);
    return { data,loading };
}