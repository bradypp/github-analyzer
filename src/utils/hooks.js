import { useEffect } from 'react';

export const useClickedOutsideHandler = ref => {
    // Alert if clicked outside of element
    const handleClickOutside = (event, condition, handler, params = null) => {
        if (ref.current && !ref.current.contains(event.target) && isExpandActive) {
            handler(params);
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
