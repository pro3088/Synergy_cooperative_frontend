"use client";
import { useState, useRef, useEffect } from 'react';

const Button = ({ text, bg, textColor, overlayContent }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const overlayRef = useRef(null);
  const buttonRef = useRef(null);

  let backgroundColorClass;
  let textColorClass;

  if (bg === 'accent') {
    backgroundColorClass = 'bg-[var(--accent-color)]';
  } else if (bg === 'green') {
    backgroundColorClass = 'bg-[var(--money-green)]';
  } else {
    backgroundColorClass = 'bg-[var(--primary-color)]';
  }

  textColorClass = textColor ? 'text-[var(--dark-color)]' : 'text-white';

  const handleClick = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleOverlayClick = (event) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsOverlayVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOverlayClick);

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
    };
  }, []);

  return (
    <div>
      <button
        ref={buttonRef}
        className={`button-big rounded-md p-2 text-center align-center  ${backgroundColorClass} ${textColorClass}`}
        onClick={handleClick}
      >
        {text}
      </button>

      {isOverlayVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div ref={overlayRef} className="bg-[var(--plain-color)] p-8 rounded-md">
            {overlayContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
