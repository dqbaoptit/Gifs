import { useEffect,useState } from 'react';

export default (url) => {
    const [data,setData] = useState({
        loading: false,
        data: null,
    });
    useEffect(() => {
        setData({
            ...data,
            loading: true,
        })
        async function Fetching() {
            try {
                const response = await fetch(url);
                const JSON = await response.json();
                setData({
                    ...data,
                    data: JSON.data,
                })
            }
            catch (error) {
                console.log(error);
            }
        }
        Fetching();
        setData({
            ...data,
            loading: false
        })
    },[url]);
    return data;
};

