"use client";

import { useEffect, useRef, useState } from "react";

const useDebounce = (value: string | number, delay = 1000) => {
  const [debounce, setDebounce] = useState<string | number>("");

  const typingRef = useRef<any>(undefined);

  useEffect(() => {
    if (typingRef.current) clearTimeout(typingRef.current);
    typingRef.current = setTimeout(() => setDebounce(value), delay);
  }, [value]);

  return debounce;
};

export default useDebounce;
