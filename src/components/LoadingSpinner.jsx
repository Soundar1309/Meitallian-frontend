import loadingSpinner from "../assets/spinner.png";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[51] bg-[#fff] bg-opacity-75">
      <div className="relative">
        <div className="animate-ping absolute inline-flex h-24 w-24">
          <img src={loadingSpinner} alt="spinner" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
