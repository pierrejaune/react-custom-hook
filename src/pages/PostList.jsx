import Post from '../components/Post';
import User from '../components/User';

function PostList() {
  return (
    <>
      <style>{`
      .post-list{
        padding-bottom:5vw;
        padding-bottom:5vw;
      }
        ul li{
          list-style:circle;
        }
      `}</style>
      <section className='post-list'>
        <h2>react-custom-hook</h2>
        <p>
          <a
            href='https://reffect.co.jp/react/react-custom-hook'
            target='_blank'
            rel='noopener noreferrer'
          >
            参考サイト
          </a>
        </p>

        <Post title='List of articles' content='title' />
        <User title='List of users' content='name' />
      </section>
    </>
  );
}

export default PostList;
