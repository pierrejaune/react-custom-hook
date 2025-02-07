import useFetchData from '../hooks/useFetchData';

const Post = ({ title, content }) => {
  const { data } = useFetchData('https://jsonplaceholder.typicode.com/posts');
  return (
    <article style={{ marginTop: '3rem' }}>
      <h3>{title}</h3>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post[content]}</li>
        ))}
      </ul>
    </article>
  );
};

export default Post;
