import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type PositionType = "top" | "bottom";
const MAX_MENU_HEIGHT = 176;

const Dropdown = () => {
  const itemsList = [
    { name: "India", value: "india" },
    { name: "Canada", value: "canada" },
    { name: "Germany", value: "germany" },
    { name: "Japan", value: "japan" },
    { name: "France", value: "france" },
    { name: "Australia", value: "australia" },
    { name: "Brazil", value: "brazil" },
  ];
  const [selectedValue, setSelectedValue] = useState<string>("Select");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<PositionType>("bottom");

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuListRef = useRef<HTMLUListElement | null>(null);

  //handling viewport collision

  function updatePosition() {
    if (!triggerRef.current || !menuListRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();

    const menuRect = menuListRef.current.getBoundingClientRect();

    const menuHeight = Math.min(
      menuListRef.current.scrollHeight,
      MAX_MENU_HEIGHT,
    );

    const spaceBelow = window.innerHeight - triggerRect.bottom;

    const spaceAbove = triggerRect.top;

    const shouldOpenAbove = spaceBelow < menuHeight && spaceAbove > menuHeight;

    setPosition(shouldOpenAbove ? "top" : "bottom");
  }

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  //handling outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <motion.div ref={containerRef} className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="shadow px-4 py-1 rounded font-mono font-medium cursor-pointer bg-neutral-100"
      >
        {selectedValue}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              stiffness: 400,
              damping: 20,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            role="listbox"
            ref={menuListRef}
            className={`p-1 rounded ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"}  shadow space-y-4 max-h-44   overflow-y-scroll bg-white  absolute w-auto`}
          >
            {itemsList.map((item) => (
              <li key={item.value} role="option">
                <button
                  type="button"
                  aria-selected={selectedValue === item.name}
                  onClick={() => {
                    setSelectedValue(item.name);
                    setIsOpen(false);
                  }}
                  className="px-4 hover:bg-neutral-100 cursor-pointer"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dropdown;
