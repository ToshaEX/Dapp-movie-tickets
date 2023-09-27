export default function Loading() {
  return (
    <div className="absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 z-50 bg-black opacity-30">
      <div
        className="border-white h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className=" !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
    </div>
  );
}
