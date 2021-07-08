import PlayerGlobal from '../components/PlayerGlobal';
import {useCallback, useEffect, useRef, useState} from 'react';

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
  height: "calc(20vw * 0.5625)",
  position:"fixed",
  right:"20px",
}

function Home() {
  const componentBackground = useRef(null)
  const [floating, setFloating] = useState(false)
  const [size, setSize] = useState(initialSize)
  const [playerSize, setPlayerSize] = useState(initialSizeFloating)

  const updateSize = useCallback(()=>{
    if (componentBackground!= null) {
      setSize({
        ...size,
        height: window.getComputedStyle(componentBackground.current).height,
        width: window.getComputedStyle(componentBackground.current).width,
      })
    }
  }, [size, setSize, componentBackground])

  const changeSizeGlobalPlayer = useCallback((minimized = true) => {
    if (minimized) {
      return setPlayerSize(initialSizeFloating)
    }
    return setPlayerSize({...initialSizeFloating, ...size})
  }, [setPlayerSize, initialSizeFloating, size])

  useEffect(() => {
    setSize({
      ...size,
      height: window.getComputedStyle(componentBackground.current).height,
      width: window.getComputedStyle(componentBackground.current).width,
    })
  }, [componentBackground, setSize])
  
  useEffect(() => {
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [updateSize])

  useEffect(() => {
    changeSizeGlobalPlayer(floating)
  }, [floating, changeSizeGlobalPlayer])

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
