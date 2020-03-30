import { useEffect } from 'react';

// Hook that alerts clicks outside of the passed ref
export const useClickedOutsideHandler = (ref, condition, handler, handlerParams = null) => {
    // Alert if clicked outside of element
    const handleKeyDown = event => {
        if (ref.current && condition && event.keyCode === 27) {
            handler(handlerParams);
        }
    };
    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target) && condition) {
            handler(handlerParams);
        }
    };

    useEffect(() => {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    });
};
