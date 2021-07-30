import React, { useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideClickAlert = (ref,cb) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log('called outside');

      if (ref.current && !ref.current.contains(event.target)) {
        cb(true)
      } else {
        cb(false)
      }
    };

    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
  // console.log('clickedOutSide',clickedOutSide)
};
export default useOutsideClickAlert;
