"use client";
import { CirclesWithBar } from "react-loader-spinner";

const Loading = () => {
  return (
    <div>
      <CirclesWithBar
        height="36"
        width="36"
        color="#4fa94d"
        outerCircleColor="white"
        innerCircleColor="white"
        barColor="white"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export const Loader = () => {
  return (
    <div>
      <CirclesWithBar
        height="150"
        width="150"
        color="#4fa94d"
        outerCircleColor="green"
        innerCircleColor="green"
        barColor="green"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
