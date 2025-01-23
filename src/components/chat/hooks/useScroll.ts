import { useEffect, useState } from "react";

export default function useScroll() {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY || document.body.scrollTop || 0;
      setIsAtBottom(scrolled >= scrollableHeight - 50);
    };

    const handleResize = () => {
      const isMobile = window.innerWidth < 768; 
      if (isMobile) {
        const viewportHeight = window.innerHeight;
        const screenHeight = screen.height;

        setIsKeyboardOpen(viewportHeight < screenHeight * 0.75);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isAtBottom, isKeyboardOpen }
}