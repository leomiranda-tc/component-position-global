# Hook to make a float player

<img src="preview.gif" style="width:100%"/>

# Usage

```js

import PlayerGlobal from '../components/PlayerGlobal';
import {useRef} from 'react';
import useSizeFloatingMonitor from '../hooks/useSizeFloatingMonitor';

const initialSize = {
  height:"",
  width:"",
  top:8,
  right:"auto",
  position:"absolute"
}

const initialSizeFloating = {
  top:"auto",
  bottom:"20px",
  width: "20vw",
  height: "calc(20vw * 0.5625)", // 16:9
  position:"fixed",
  right:"20px",
}

function Home() {
  const componentBackground = useRef(null)
  const {playerSize, setFloating, floating} = useSizeFloatingMonitor(componentBackground, initialSize, initialSizeFloating);

  return (
    <>
      <div ref={componentBackground} className="backgroundPlayer">
        <h1>Player Minimizado</h1>
      </div>
      
      <PlayerGlobal {...playerSize} />

      <button onClick={() => setFloating(!floating)}>
        {floating?"Voltar para tela":"Minimizar"}
      </button>
    </>
  );
}

export default Home;


```