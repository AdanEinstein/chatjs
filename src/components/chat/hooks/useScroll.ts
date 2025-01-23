import { useEffect, useState } from "react";

export default function useScroll() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setIsAtBottom(scrolled >= scrollableHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return { isAtBottom }
}