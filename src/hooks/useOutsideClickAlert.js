import React, {  useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideClickAlert = (ref) => {
    const [clickedOutSide, setOutSideClick] = useState(false) ;
    useEffect(() => {
        const  handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOutSideClick(true)
            }
            else {
                setOutSideClick(false);
            }
        };

        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);
    return clickedOutSide;
};
export default useOutsideClickAlert