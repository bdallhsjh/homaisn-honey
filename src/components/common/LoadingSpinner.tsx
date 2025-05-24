const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative h-16 w-16">
        <div className="absolute top-0 left-0 h-full w-full border-4 border-primary-200 rounded-full"></div>
        <div className="absolute top-0 left-0 h-full w-full border-4 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;