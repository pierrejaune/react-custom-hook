import Head from './components/Head';

import Home from './pages/Home';
import PostList from './pages/PostList';
import EightHooks from './pages/EightHooks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <style>
        {`
        .ui.container{

        }
        h1,h2{
          color:gray;
          font-size:2rem;
        }
        h3{
          padding-top:1rem;
          font-size:2rem;
          font-weight:bold;
        }
      `}
      </style>
      <Router>
        <div className='ui container'>
          <Head />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/postList' element={<PostList />} />
            <Route path='/eightHooks' element={<EightHooks />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
