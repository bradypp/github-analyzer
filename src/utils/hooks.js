import { useEffect } from 'react';

// Hook that alerts clicks outside of the passed ref
export const useClickedOutsideHandler = (ref, condition, handler, handlerParams = null) => {
    // Alert if clicked outside of element
    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target) && condition) {
            handler(handlerParams);
        }
    };

    useEffect(() => {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });
};
