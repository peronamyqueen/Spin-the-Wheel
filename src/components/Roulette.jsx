import { useState } from "react";
import Stats from "./Stats";

function Roulette({ lots, setLots }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (!spinning) {
      setSpinning(true);
      const randomSpin = rotation + 360 * 5 + Math.floor(Math.random() * 360);
      setRotation(randomSpin);
      setTimeout(() => setSpinning(false), 3000);
    }
  };
  const voteSum = lots.reduce((total, lot) => total + lot.votes, 0);
  const sectorAngle = lots.length === 1 ? 359.999 : 360 / voteSum;
  return (
    <div className="flex flex-col md:flex-row h-screen w-full gap-x-4 md:gap-x-12 overflow-auto">
      <div className="w-full md:w-1/3 max-h-screen overflow-auto p-4">
        <Stats lots={lots} setLots={setLots} spinning={spinning} />
      </div>
      <div className="relative flex flex-col items-center justify-center w-full max-w-[min(90vw,1000px)] p-4 gap-y-6">
        <div className="relative w-full max-w-[min(90vw,800px)] aspect-square shadow-2xl/40 rounded-full">
          <svg
            className="absolute w-full h-full transition-transform duration-3000 ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
            viewBox="0 0 100 100"
          >
            {lots.map((lot, index) => {
              const startAngle =
                index === 0
                  ? 0
                  : lots
                    .slice(0, index)
                    .reduce(
                      (sum, prevLot) => sum + sectorAngle * prevLot.votes,
                      0,
                    );
              const endAngle = startAngle + sectorAngle * lot.votes;
              const largeArc = sectorAngle * lot.votes > 180 ? 1 : 0;
              const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);
              return (
                <g key={index}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={`${lot.color}`}
                  />
                  <text
                    x={
                      50 +
                      35 *
                      Math.cos(
                        ((startAngle + sectorAngle / 2) * Math.PI) / 180,
                      )
                    }
                    y={
                      50 +
                      35 *
                      Math.sin(
                        ((startAngle + sectorAngle / 2) * Math.PI) / 180,
                      )
                    }
                    fill="white"
                    className="font-bold text-shadow-neutral-950"
                    fontSize={`min(0.3vw, 5rem)`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      maxWidth: "30px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                    transform={`rotate(${startAngle + sectorAngle / 2}, ${50 + 35 * Math.cos(((startAngle + sectorAngle / 2) * Math.PI) / 180)}, ${50 + 35 * Math.sin(((startAngle + sectorAngle / 2) * Math.PI) / 180)})`}
                  >
                    {lot.lot.length > 15
                      ? lot.lot.slice(0, 15) + "..."
                      : lot.lot}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="absolute top-0 left-1/2 w-0 h-0 border-l-[min(4vw,16px)] border-r-[min(4vw,16px)] border-t-[min(20vw,80px)] border-l-transparent border-r-transparent border-t-black-600 transform -translate-x-1/2"></div>
        </div>
        <button
          onClick={spinWheel}
          className="shadow-2xl/30 border-4 text-base sm:text-xl text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-center"
          style={{ borderColor: "#910000" }}
        >
          Spin!
        </button>
      </div>
    </div>
  );
}

export default Roulette;
