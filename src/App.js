import { useEffect, useRef, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [dummyData, setDummyData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [recentId, setRecentId] = useState("");
  const [timer, setTimer] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [resetBtnDisable, setResetBtnDisable] = useState(true);
  const [isMessage, setIsMessage] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const intv = useRef(null);
  useEffect(() => {
    if (startTimer === false) return;
    else {
      if (timer < 30) {
        intv.current = setInterval(() => {
          setTimer((t) => t + 1);
        }, 1000);
      }
    }
    
    return () => {
      clearInterval(intv.current);
    };
  }, [startTimer, timer]);

  useEffect(() => {
    if (timer === 30) {
      setResetBtnDisable(false);
    } else {
      setResetBtnDisable(true);
    }
  }, [timer]);

  async function fetchData() {
    setIsLoading(true);
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    const jsonData = await data.json();
    setDummyData(jsonData);
    setIsLoading(false);
    setShowOtp(true);
    setTimer(0);
    setStartTimer(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value === recentId) {
      setValue("");
      setIsMessage(true);
      return;
    }
    clearInterval(intv.current);
    setIsMessage(false);
    setRecentId(value);
    setValue("");
    fetchData();
  };

  return (
    <div className="flex flex-col gap-10 m-10 items-center ">
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg">Enter your Email</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="border-2 border-gray-300 rounded-md p-1"
            value={value}
            type="email"
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-1 bg-orange-500 rounded-md text-white"
          >
            Generate OTP
          </button>
        </form>
      </div>

      {isLoading && <p className="text-md">Please wait....</p>}
      {isMessage && (
        <p>
          Entered email is same as the previous email. Timer will not reset.
        </p>
      )}
      {showOtp && (
        <div className="flex flex-col gap-2 items-center">
          <p className="font-medium">Enter OTP</p>
          <input className="border-2 border-gray-300 rounded-md p-1" />
          <p>Resend OTP in {timer} sec(s)</p>
          <button
            onClick={() => fetchData()}
            disabled={resetBtnDisable}
            className={
              resetBtnDisable
                ? "py-1 px-4 rounded-md text-white bg-gray-300"
                : "py-1 px-4 rounded-md text-white bg-gray-500"
            }
          >
            Resend
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
