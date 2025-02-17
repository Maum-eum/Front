import React, { useState, useEffect, useRef } from "react";

type ScrollListBoxProps = {
  children: React.ReactNode;
};

const ScrollListBox: React.FC<ScrollListBoxProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const checkScrollable = () => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = scrollRef.current;
      setIsScrollable(scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight - 10);
    }
  };

  useEffect(() => {
    checkScrollable();
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={checkScrollable}
        className="h-[420px] sm: overflow-y-auto hover:scrollbar-show scrollbar-hide"
      >
        {children}
      </div>
      {isScrollable && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-base-white to-transparent"></div>
      )}
    </div>
  );
};

export default ScrollListBox;
