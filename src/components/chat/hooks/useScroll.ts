import { useEffect, useState } from "react";

export default function useScroll() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY || document.body.scrollTop || 0;

      setIsAtBottom(scrolled >= scrollableHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return { isAtBottom }
}