import React, { useEffect, useRef } from 'react';

const removeUnit = (string) => parseInt(string.replace('px', ''), 10);

const CELL_SIZE = 20;
const NUM_OF_COLUMNS = 10;
const NUM_OF_ROWS = 10;

const grids = Array(NUM_OF_COLUMNS * NUM_OF_ROWS).fill(0);

const SelectableGrid = () => {
  const boxRef = useRef();
  const anchor = useRef({});
  const selectedGrids = useRef([]);

  useEffect(() => {
    const move = (e) => {
      const { pageX: cursorX, pageY: cursorY } = e;

      const width = cursorX - anchor.current.x;
      const height = cursorY - anchor.current.y;

      if (width <= 0) {
        boxRef.current.style.left = `${cursorX}px`;
      } else {
        // Fix anchor position in case previous x is smaller than anchor x
        boxRef.current.style.left = `${anchor.current.x}px`;
      }

      if (height <= 0) {
        boxRef.current.style.top = `${cursorY}px`;
      } else {
        // Fix anchor position in case previous x is smaller than anchor y
        boxRef.current.style.top = `${anchor.current.y}px`;
      }

      boxRef.current.style.width = `${Math.abs(width)}px`;
      boxRef.current.style.height = `${Math.abs(height)}px`;

      const { left, top } = boxRef.current.style;

      const newWidth = Math.abs(width);
      const newHeight = Math.abs(height);
      const newLeft = removeUnit(left);
      const newTop = removeUnit(top);

      const grids = document
        .querySelector('.grids-wrapper')
        .querySelectorAll('div');
      const scrollLeft = document.documentElement.scrollLeft;
      const scrollTop = document.documentElement.scrollTop;

      selectedGrids.current = [];
      // Evaluate each grid
      for (let i = 0; i < grids.length; i += 1) {
        const {
          x,
          y,
          width: cellWidth,
          height: cellHeight,
        } = grids[i].getBoundingClientRect();

        const cellX = scrollLeft + x;
        const cellY = scrollTop + y;

        if (
          cellX > newLeft &&
          cellX + cellWidth < newLeft + newWidth &&
          cellY > newTop &&
          cellY + cellHeight < newTop + newHeight
        ) {
          grids[i].style.background = '#b6b6b6';
          selectedGrids.current.push(grids[i]);
        } else {
          grids[i].style.background = 'transparent';
        }
      }
    };

    const down = (e) => {
      // Get click position and make it as an anchor
      const { pageX: x, pageY: y } = e;
      anchor.current = { x, y };

      boxRef.current.style.left = `${x}px`;
      boxRef.current.style.top = `${y}px`;
      boxRef.current.style.border = 'black 2px dashed';

      // Start selecting
      window.addEventListener('mousemove', move);
    };

    const up = () => {
      // Stop selecting
      window.removeEventListener('mousemove', move);

      // Reset boundingRect style
      boxRef.current.style.width = `${0}px`;
      boxRef.current.style.height = `${0}px`;
      boxRef.current.style.border = 'none';

      // Change selected grids color
      selectedGrids.current.forEach((cell) => {
        cell.style.background = 'blue';
      });

      // Empty selected grids
      selectedGrids.current = [];
    };

    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    return () => {
      window.removeEventListener('mousedown', down);
      window.addEventListener('mouseup', up);
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <div
        ref={boxRef}
        style={{
          position: 'absolute',
        }}
      />
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          marginTop: '200px',
        }}
      >
        <div
          className="grids-wrapper"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${NUM_OF_COLUMNS}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${NUM_OF_ROWS}, ${CELL_SIZE}px)`,
          }}
        >
          {grids.map((i) => {
            return (
              <div
                key={`grid${i}`}
                style={{
                  border: '1px solid black',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SelectableGrid;
