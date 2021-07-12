import {useCallback, useEffect, useState} from 'react';

const useSizeFloatingMonitor = (ref, initialSize, sizeFloating) => {

    const [floating, setFloating] = useState(false)
    const [size, setSize] = useState(initialSize)
    const [playerSize, setPlayerSize] = useState(sizeFloating)

    const updateSize = useCallback(()=>{
        if (ref!= null) {
        setSize({
            ...size,
            height: window.getComputedStyle(ref.current).height,
            width: window.getComputedStyle(ref.current).width,
        })
        }
    }, [size, setSize, ref])

    const changeSizeGlobalPlayer = useCallback((minimized = true) => {
        if (minimized) {
        return setPlayerSize(sizeFloating)
        }
        return setPlayerSize({...sizeFloating, ...size})
    }, [setPlayerSize, sizeFloating, size])

    useEffect(() => {
        setSize({
        ...size,
        height: window.getComputedStyle(ref.current).height,
        width: window.getComputedStyle(ref.current).width,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, setSize])
    
    useEffect(() => {
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [updateSize])

    useEffect(() => {
        changeSizeGlobalPlayer(floating)
    }, [floating, changeSizeGlobalPlayer])

    return {
        setFloating,
        floating,
        playerSize,
    };
}

export default useSizeFloatingMonitor;