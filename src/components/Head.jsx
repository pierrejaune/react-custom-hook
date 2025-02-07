import { useNavigate } from 'react-router-dom';

import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

function Head() {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
        header.header{
          margin:30px 0;
          text-align:center;
          display:flex;
          flex-wrap:wrap;
          justify-content: center;
        }
        header.header h1{
          width:100%;
        }
        header.header a{
          transition:opacity 0.1s;
        }
        header.header a:hover{
          opacity:0.7;
        }
        header.header img{
          width:5vw;
        }
        header.header ul{
          margin-top:3rem;
          width:100%;
          listStyle: none;
          display: flex;
          gap: 1rem;
          cursor: pointer;
        }
      `}
      </style>
      <div className='ui container'>
        <header className='header'>
          <h1>Vite + Reactでプロジェクト作成</h1>
          <a href='https://vite.dev' target='_blank'>
            <img src={viteLogo} className='logo' alt='Vite logo' />
          </a>
          <a href='https://react.dev' target='_blank'>
            <img src={reactLogo} className='logo react' alt='React logo' />
          </a>
          <ul>
            <li className='ui button blue' onClick={() => navigate('/')}>
              Home
            </li>
            <li
              className='ui button blue'
              onClick={() => navigate('/postList')}
            >
              Post List
            </li>
            <li
              className='ui button blue'
              onClick={() => navigate('/eightHooks')}
            >
              8つのReact Hooks
            </li>
          </ul>
        </header>
      </div>
    </>
  );
}

export default Head;
