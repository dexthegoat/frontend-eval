import './App.css';
import { useRef, useEffect } from 'react';

const CELL_SIZE = 20;
const NUM_OF_COLUMNS = 10;
const NUM_OF_ROWS = 10;

const pxRemover = (str) => parseInt(str.replace('px', ''));

function App() {
  const boxRef = useRef();
  const anchor = useRef({});
  const selectedGrids = useRef([]);

  useEffect(() => {
    const down = (e) => {
      const { pageX, pageY } = e;
      anchor.current = { pageX, pageY };

      boxRef.current.style.left = `${pageX}px`;
      boxRef.current.style.top = `${pageY}px`;
      boxRef.current.style.border = '2px dashed black';

      window.addEventListener('mousemove', move);
    };

    const move = (e) => {
      const { pageX: cursorX, pageY: cursorY } = e;

      const widthMoved = cursorX - anchor.current.pageX;
      const heightMovd = cursorY - anchor.current.pageY;

      if (widthMoved <= 0) {
        boxRef.current.style.left = `${cursorX}px`;
      } else {
        boxRef.current.style.left = `${anchor.current.pageX}`;
      }

      if (heightMovd <= 0) {
        boxRef.current.style.top = `${cursorY}px`;
      } else {
        boxRef.current.style.top = `${anchor.current.pageY}`;
      }

      boxRef.current.style.width = `${Math.abs(widthMoved)}px`;
      boxRef.current.style.height = `${Math.abs(heightMovd)}px`;

      const { left, top } = boxRef.current;

      const newLeft = pxRemover(left);
      const newTop = pxRemover(top);
      const newWidth = Math.abs(widthMoved);
      const newHeight = Math.abs(heightMovd);

      const grids = document
        .querySelector('.grid-container')
        .querySelectorAll('div');

      for (let i = 0; i < grids.length; i++) {
        const {
          x,
          y,
          width: cellWidth,
          height: cellHeight,
        } = grids[i].getBoundingClientRect();

        if (
          x > newLeft &&
          x + cellWidth < newLeft + newWidth &&
          y > newTop &&
          y + cellHeight < newTop + newHeight
        ) {
          grids[i].style.background = 'gray';
          selectedGrids.current.push(grids[i]);
        } else {
          grids[i].style.background = 'transparent';
        }
      }

      window.addEventListener('mouseup', up);
    };

    const up = () => {
      window.removeEventListener('mousemove', move);

      boxRef.current.style.width = `0px`;
      boxRef.current.style.height = `0px`;
      boxRef.current.style.border = 'none';

      selectedGrids.current.forEach((cell) => {
        cell.style.background = 'blue';
      });
      selectedGrids.current = [];
    };

    window.addEventListener('mousedown', down);
    return () => {};
  }, []);

  return (
    <>
      <div ref={boxRef} style={{ position: 'absolute' }}></div>
      <div
        className="grid-container"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${NUM_OF_COLUMNS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${NUM_OF_ROWS}, ${CELL_SIZE}px)`,
          border: '1px solid black',
        }}
      >
        {Array(NUM_OF_ROWS * NUM_OF_COLUMNS)
          .fill(0)
          .map((_, idx) => {
            return (
              <div
                key={`grid-${idx}`}
                style={{ border: '1px solid black', userSelect: 'none' }}
              ></div>
            );
          })}
      </div>
    </>
  );
}

export default App;
