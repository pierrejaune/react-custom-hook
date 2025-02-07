import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const myCodeInfo = {
  name: 'my name',
  age: 37,
};
const MyCodeContext = createContext(myCodeInfo);

{
  /*
  <App/>をStrictModeタグで囲うとconsoleなどの処理が2回実行されることを覚えておこう
  ビルドすると１回になるので安心。
  */
}
createRoot(document.getElementById('root')).render(
  <MyCodeContext.Provider value={myCodeInfo}>
    <StrictMode>
      <App />
    </StrictMode>
  </MyCodeContext.Provider>
);

export default MyCodeContext;
