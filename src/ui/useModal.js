import { useEffect, useRef } from 'react';

function useModal(isOpen, setShowForm) {
  const ref = useRef();
  console.log(ref);

  function ClickOutsideWindow(e) {
    if (ref.current && !ref.current.contains(e.target)) setShowForm('');
  }
  useEffect(function () {
    window.addEventListener('click', ClickOutsideWindow, true);
    if (isOpen === 'CabinForm') document.body.classList.add('scroll');
    return () => window.removeEventListener('click', ClickOutsideWindow, true);
  }, []);
  return ref;
}
export default useModal;
