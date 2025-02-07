import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      const useGetData = async (async) => {
        const response = await axios.get(url);
        if (!response.status === 200) {
          throw new Error(`HTTP エラー`);
        }
        const getData = await response.data.slice(0, 10);
        setData(getData);
      };
      useGetData();
    } catch (err) {
      console.log(err);
    }
  }, [url]);
  return { data };
  // return (
  //   <article style={{ marginTop: '3rem' }}>
  //     <h1>List of articles</h1>
  //     <ul>
  //       {posts.map((post) => (
  //         <li key={post.id}>{post.title}</li>
  //       ))}
  //     </ul>
  //   </article>
  // );
};

export default useFetchData;
