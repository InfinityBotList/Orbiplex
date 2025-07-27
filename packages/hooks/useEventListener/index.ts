import { useRef, useState, useEffect } from 'react'
import type { RefObject } from 'react'

const description = 'Adds and cleans up an event listener on a specified target element.'

/**
 * Adds and cleans up an event listener on a specified target element.
 *
 * @param eventName The event type (e.g. 'click', 'scroll', 'resize', etc.).
 * @param handler The event handler function.
 * @param element Optional: The target element to attach the event listener to (defaults to window).
 */
export function useEventListener<K extends keyof WindowEventMap & keyof HTMLElementEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K] | HTMLElementEventMap[K]) => void,
    element?: RefObject<HTMLElement | null> | Window
): void {
    const savedHandler = useRef(handler)

    // Update the saved handler if it changes
    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        const targetElement: HTMLElement | Window | null = element && 'current' in element ? element.current : window

        if (!targetElement) return

        const eventListener = (event: Event) => savedHandler.current(event as WindowEventMap[K])

        targetElement.addEventListener(eventName, eventListener)

        return () => {
            targetElement.removeEventListener(eventName, eventListener)
        }
    }, [eventName, element])
}
