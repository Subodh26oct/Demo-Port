const Alert = ({ type, text }) => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl flex justify-center items-center z-50 pointer-events-none">
      <div
        className={`${
          type === 'danger' ? 'bg-red-800/95 border-red-600' : 'bg-blue-800/95 border-blue-600'
        } w-full items-center text-indigo-100 leading-none rounded-lg p-4 border flex`}
        role="alert">
        <p
          className={`flex rounded-full ${
            type === 'danger' ? 'bg-red-500' : 'bg-blue-500'
          } uppercase px-2 py-1 text-xs font-semibold mr-3 shrink-0`}>
          {type === 'danger' ? 'Failed' : 'Success'}
        </p>
        <p className="mr-2 text-left text-sm sm:text-base">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
