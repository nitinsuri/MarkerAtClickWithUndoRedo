import React from 'react';
import './style.css';

export default function App() {
  const [points, setPoints] = React.useState([]);
  const [poppedPoint, setPoppedPoint] = React.useState([]);
  const handleStage = (e) => {
    const { clientX, clientY } = e;
    setPoints([
      ...points,
      {
        x: clientX,
        y: clientY,
        wh: Math.floor(
          Math.random() * (Math.floor(35) - Math.ceil(15)) + Math.ceil(15)
        ),
      },
    ]);
    setPoppedPoint([]);
  };
  const handleUndo = () => {
    const updatedPoints = [...points];
    setPoppedPoint([...poppedPoint, updatedPoints.pop()]);
    setPoints(updatedPoints);
  };
  const handleRedo = () => {
    const returnToStage = [...poppedPoint].pop();
    poppedPoint.pop();
    setPoints([...points, returnToStage]);
  };
  const handleClear = () => {
    setPoints([]);
    setPoppedPoint([]);
  };
  return (
    <>
      <button disabled={points.length === 0} onClick={() => handleUndo()}>
        Undo
      </button>
      <button disabled={poppedPoint.length === 0} onClick={() => handleRedo()}>
        Redo
      </button>
      <button disabled={points.length === 0} onClick={() => handleClear()}>
        Clear
      </button>
      <div
        className={'stage'}
        onClick={(e) => {
          handleStage(e);
        }}
      >
        {points &&
          points.map((point) => (
            <div
              key={point.x + point.y}
              style={{
                left: point.x + 'px',
                top: point.y + 'px',
                height: point.wh + 'px',
                width: point.wh + 'px',
              }}
            ></div>
          ))}
      </div>
    </>
  );
}
