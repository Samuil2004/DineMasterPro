function VegetarianInput({ register, errors }) {
  return (
    <>
      <div className=" flex items-center content-center text-center">
        <h3 className="mb-1.5">Vegetarian:</h3>
        <input
          type="checkbox"
          className="scale-150 ml-[15px]"
          {...register("isItemVegetarianInput")}
        />
      </div>
    </>
  );
}

export default VegetarianInput;
