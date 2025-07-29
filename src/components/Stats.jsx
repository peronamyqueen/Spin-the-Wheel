import { useState } from "react";

function Stats({ lots, setLots, spinning }) {
  const [newVal, setNewVal] = useState("");

  const addLots = (item) => {
    if (!spinning) {
      setLots((element) => element.filter((el) => el.lot !== ""));
      let newColor = getRandColor();
      while (lots.some((el) => el.color === newColor)) {
        newColor = getRandColor();
      }
      setLots((prevLots) => [
        ...prevLots,
        { lot: item, color: newColor, votes: 1 },
      ]);
      setNewVal("");
    }
  };

  const deleteLot = (i) => {
    if (!spinning) {
      lots.length > 1
        ? setLots((element) => element.filter((_, index) => index !== i))
        : 0;
    }
  };
  const updateVotes = (action, item) => {
    if (!spinning) {
      setLots((prevLots) =>
        prevLots.map((el) => {
          if (el.lot === item.lot && el.color === item.color) {
            if (action === "add" && lots.length > 1) {
              return { ...el, votes: el.votes + 1 };
            } else if (action === "remove" && el.votes > 1) {
              return { ...el, votes: el.votes - 1 };
            }
          }
          return el;
        }),
      );
    }
  };
  function getRandColor() {
    let code = "#";
    const range = "1234567890ABCDEF";
    for (let i = 0; i < 6; i++) {
      code += range[Math.floor(Math.random() * 16)];
    }
    return code;
  }
  const voteSum = lots.reduce((total, lot) => total + lot.votes, 0);

  return (
    <div className="min-w-[theme('spacing.32')] p-4 sm:p-5 flex flex-col gap-y-2 sm:gap-y-3 justify-center items-center">
      <h1 className="text-shadow-lg text-lg sm:text-3xl md:text-4xl text-white font-bold">
        Spin the Wheel!
      </h1>
      <form
        className="flex flex-row w-full"
        onSubmit={(e) => {
          e.preventDefault();
          addLots(newVal);
        }}
      >
        <input
          type="text"
          value={newVal}
          placeholder="Add Slot"
          className="bg-white w-full rounded-sm border-2 sm:border-3 text-sm sm:text-base leading-7 sm:leading-8 text-center"
          onChange={(e) => setNewVal(e.target.value)}
        />
        <input
          type="submit"
          value="Add"
          className="bg-white ms-1 sm:ms-1.5 border-2 sm:border-3 rounded-sm hover:bg-red-800 w-1/4 sm:w-1/5 text-sm sm:text-base leading-7 sm:leading-8"
        />
      </form>
      {lots.map((item, index) => {
        return (
          <div className="w-full flex flex-row" key={index}>
            <div
              className="shadow-2xl/30 border-2 sm:border-3 w-full rounded-sm px-2 sm:px-3 flex flex-row justify-between text-sm sm:text-base md:text-lg leading-7 sm:leading-8"
              style={{
                backgroundImage: `linear-gradient(to right, ${item.color} 10%, white 70%)`,
              }}
            >
              <span className="truncate bg-white my-1 px-1 leading-5 rounded-sm shadow-xl text-wrap">
                {item.lot}
              </span>
              <span>
                {((item.votes / voteSum) * 100).toFixed(2)}% | {item.votes}
              </span>
            </div>
            <button
              className="flex bg-white border-2 sm:border-3 ms-1 sm:ms-1.5 rounded-sm hover:bg-red-600 w-1/4 sm:w-1/5 justify-center items-center"
              onClick={() => deleteLot(index)}
            >
              <img
                src="./src/assets/delete.svg"
                alt="Del"
                className="w-4 sm:w-5"
              />
            </button>
            <button
              className="flex bg-white border-2 sm:border-3 ms-1 sm:ms-1.5 rounded-sm hover:bg-green-600 w-1/4 sm:w-1/5 justify-center items-center text-sm sm:text-base font-bold"
              onClick={() => updateVotes("add", item)}
            >
              +
            </button>
            <button
              className="flex bg-white border-2 sm:border-3 ms-1 sm:ms-1.5 rounded-sm hover:bg-red-600 w-1/4 sm:w-1/5 justify-center items-center text-sm sm:text-base font-bold"
              onClick={() => updateVotes("remove", item)}
            >
              -
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Stats;
