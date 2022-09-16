import React, { useState, useEffect } from 'react';
export function useMobileOnly() {
  const [mobileOnly,setMobileOnly] = useState<boolean>()

    useEffect(() => {
      function handleResize() {
        setMobileOnly(window.innerWidth < 720);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []); 
    return {mobileOnly};
  }