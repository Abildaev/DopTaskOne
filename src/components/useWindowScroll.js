import {useCallback, useRef, useState} from "react";
import {useWindowEvent} from "./useWindowEvent";


export function useWindowScroll () {
    const windowElement = useRef(window);
    const [scroll, setScroll] = useState({
        x: 0,
        y: 0
    })

    useWindowEvent('load', () => {
        setScroll({
            x: Math.round(windowElement.current.scrollX),
            y: Math.round(windowElement.current.scrollY)

        })
    }, {
        capture: true
    })

    useWindowEvent('scroll', () => {
        setScroll({
            x: Math.round(windowElement.current.scrollX),
            y: Math.round(windowElement.current.scrollY)

        })
    }, {
        capture: true
    })

    const scrollTo = useCallback((scroll) => {
        windowElement.current.scrollTo(windowElement.current.scrollX, scroll.y)
    }, [scroll.y])


    return [scroll, scrollTo]
}