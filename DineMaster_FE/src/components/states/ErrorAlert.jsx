function ErrorAlert({ errorMessage }) {
  return (
    <div className="w-full max-w-md mx-auto my-4 p-4 bg-red-100 border border-red-400 rounded-lg text-red-700 flex shadow-lg">
      <div className="flex flex-col content-center text-center">
        <div className="flex items-center space-x-2">
          <img
            src="/images/warningIcon.png"
            alt="Warning Icon"
            className="h-8 w-8"
          />
          <p className="font-bold text-lg">Error</p>
        </div>
        <p className="text-black text-sm">{errorMessage}</p>
      </div>
    </div>
  );
}

export default ErrorAlert;
