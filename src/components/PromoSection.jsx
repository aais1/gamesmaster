const PromoSection = () => {
  return (
    <div className="md:rounded-lg pt-12 md:p-4 p-6 text-center border-opacity-[30%] flex flex-col">
      <h3 className="text-[12.2pt] md:text-[10pt]">Want to add characters to your maps?</h3>
      <div className=" mt-2 flex space-x-4 md:space-x-2">
        <div className="bg-black rounded-2xl  w-[50%] border border-white">
          IMAGE
        </div>

        <div className="w-[50%]  text-left">
          <p className="text-[12px] md:text-[10px] text-gray-400 mb-2 text-left ">
            Add more than <strong className="font-bold text-white">70 RPG Characters</strong> to make your stories even more
            intriguing.
          </p>
          <button className="bg-[#df0000] text-white px-2 py-1 rounded-sm text-[11.6px] md:text-[8.3px]">
            GET NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
