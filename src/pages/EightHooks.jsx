import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import MyCodeContext from '../main';

import SomeChild from '../components/SomeChild';
import useLocalStorage from '../components/UseLocalStorage';

// *useReducerの第一引数で使用するreducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

const EightHooks = () => {
  //*useState
  const [count, setCount] = useState(0);

  //*useContext
  const myCodeInfo = useContext(MyCodeContext);

  //*useRef
  const ref = useRef();

  //*useReducer 第一引数はreducerで第二引数は初期値
  //*[]内のstateは新しく更新されるstate、dispatchはstoreに通知を出す
  const [state, dispatch] = useReducer(reducer, 0);

  //*useMemo 値のメモ化
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  const square = useMemo(() => {
    //使用するには関数をuseMemoでラッピングする。第二引数にはこの処理を走らせたい依存関係のあるものを記載する。
    //useStateで値が更新されるたびにReactは全てのコードを読んで現状と比較する
    //count01が更新された場合でも同様のことをする。
    //この場合だとcount02以外に更新が入った場合はメモリとして保存した結果を返す為にuseMemoを使う。
    let i = 0;
    //下記は重い処理
    while (i < 100000000) {
      i++;
    }
    return count02 * count02;
  }, [count02]);

  //*useCallback 関数のメモ化
  const [counter, setCounter] = useState(0);
  const showCount = useCallback(() => {
    alert(`これは重い処理です。`);
  }, [counter]);

  //*カスタムフック
  const [age, setAge] = useLocalStorage('age', 37);
  const [tempAge, setTempAge] = useState(age);
  const inputAge = (e) => {
    setTempAge(e.target.value);
  };
  const saveAge = () => {
    setAge(tempAge);
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  //*useEffect
  useEffect(() => {
    console.log(`Hello`);
    // setCount(count + 1)//*useEffectの中でuseStateのコールバック関数を使用すると無限ループになる
  }, [count]);
  // 第二引数が[]だとページのリロード時にuseEffectが発火する
  // 第二引数が[変数]だとページのその変数の値が更新されるとuseEffectが発火する

  const handleRef = () => {
    console.log(ref.current.offsetTop);
    console.log(ref.current.value);
  };
  return (
    <>
      <style>{`
        section{
          margin-bottom:2rem;
        }
        .click-count{}
        .click-count button span{
          font-size:1.2rem;
          display:inline-block;
          }

        .use-ref input{
          margin-right:1rem;
        }
        div.ui.input{
          margin-right:1rem;
        }
      `}</style>
      <article className='hooks-list'>
        <h2>8種類のReact Hook</h2>
        <p>
          <a
            href='https://www.youtube.com/watch?v=uuAdVs7sbAs'
            target='_blank'
            rel='noopener noreferrer'
          >
            参考サイト(Youtube)
          </a>
        </p>
        <section className='click-count'>
          <h3>useState useEffect</h3>
          <h4>クリックカウント</h4>
          <p>Count:{count}</p>
          <button className='ui button yellow' onClick={handleClick}>
            Click <span>+</span>
          </button>
        </section>
        <hr />
        <section className='use-context'>
          <h3>useContext</h3>
          <h4>
            main.jsxもしくはApp.jsxに定義したデータを
            どのコンポーネントからでも使えるようにする。
            <br />
            データの受け渡し方法はmain.jsx参照
          </h4>
          <h5 style={{ color: 'orange' }}>
            会員サイトなどではReduxやuseContextのHooksを利用する
          </h5>
          <p>{myCodeInfo.name}</p>
          <p>{myCodeInfo.age}</p>
        </section>
        <hr />
        <section className='use-ref'>
          <h3>useRef</h3>
          <h4>指定した要素の情報を参照できる</h4>
          <div className='ui input'>
            <input
              type='text'
              className='ui input'
              ref={ref}
              placeholder='この要素の情報取得'
            />
          </div>
          <button className='ui button blue' onClick={handleRef}>
            UseRef
          </button>
        </section>
        <hr />
        <section className='use-reducer'>
          <h3>useReducer</h3>
          <h4>
            何かのアクションが起きた時に、それにより現状のstateとdispatchにより送られてきた情報を比較してstateの値を更新する。
            そのアルゴリズムを担っているのがReducerでそれを使うのがuseReducer。
            <br />
            詳しくは動画参照。
          </h4>
          <p>カウント：{state}</p>
          <button
            onClick={() => dispatch({ type: 'increment' })}
            className='ui button orange'
          >
            ＋
          </button>
          <button
            onClick={() => dispatch({ type: 'decrement' })}
            className='ui button blue'
          >
            ー
          </button>
        </section>
        <hr />
        <section className='use-memo'>
          <h3>useMemo</h3>
          <h4>
            パフォーマンスを上げる為に使用される。具体的にはブラウザのメモリに値を保存することができる。
            <br />
            保存＝メモ
            <br />
            依存関係がないuseStateによる値更新が入った場合でも全てのコードを読み込む為、それを避ける為に重い処理をuseMemoを囲むことで重い処理は依存関係があるものが更新された場合のみに読ませることができる。
            <br />
            何でもかんでもuseMemoで囲うとブラウザのパフォーマンスが落ちるので本当に重い処理だけに適用させる。
          </h4>
          <p>カウント１：{count01}</p>
          <p>カウント２：{count02}</p>
          <p>結果:{square}</p>
          <button
            className='ui button green'
            onClick={() => setCount01(count01 + 1)}
          >
            カウント１+１
          </button>
          <button
            className='ui button green'
            onClick={() => setCount02(count02 + 1)}
          >
            カウント２+１
          </button>
        </section>
        <hr />
        <section className='use-callback'>
          <h3>useCallback</h3>
          <h4>
            パフォーマンスを上げる為に使用される。具体的にはブラウザのメモリに関数を保存することができる。
            <br />
            保存＝メモ
            <br />
            何でもかんでもuseCallbackで囲うとブラウザのパフォーマンスが落ちるので本当に重い処理だけに適用させる。
          </h4>
          <p>カウンター：{counter}</p>
          <button
            className='ui button gold'
            onClick={() => setCounter(counter + 1)}
          >
            カウンター＋
          </button>
          {/* <SomeChild showCount={showCount} /> */}
        </section>
        <hr />
        <section className='custome-hook'>
          <h3>カスタムフック</h3>
          <h4>自作のフックを作ることができる</h4>
          <p>{age}</p>
          <div className='ui input'>
            <input
              type='text'
              placeholder='年齢を入力'
              onChange={inputAge}
              value={tempAge}
            />
          </div>
          <button onClick={saveAge} className='ui button purple'>
            年齢をセット
          </button>
        </section>
        <hr />
      </article>
    </>
  );
};

export default EightHooks;
