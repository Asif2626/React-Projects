import { useState } from "react";

export default function withToggles(WrappedComponent) {
  return function WithToggles(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const displayItems = isCollapsed
      ? props.items?.slice(0, 3) ?? []
      : props.items ?? [];

    function toggleOpen() {
      setIsOpen((o) => !o);
      setIsCollapsed(false);
    }

    return (
      <div className="list-container">
        <div className="heading">
          <h2>{props.title}</h2>
          <button onClick={toggleOpen}>
            {isOpen ? <span>&or;</span> : <span>&and;</span>}
          </button>
        </div>

        {isOpen && (
          <>
            <WrappedComponent {...props} items={displayItems} />

            <button onClick={() => setIsCollapsed((c) => !c)}>
              {isCollapsed ? `Show all ${props.items.length}` : "Show less"}
            </button>
          </>
        )}
      </div>
    );
  };
}
