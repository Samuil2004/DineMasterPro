function OrderBox(props) {
  const allItemsPrepared = props.checkItemsStatus(props.order);

  return (
    console.log(props.order),
    (
      <>
        <div
          key={props.order.orderId}
          className="bg-black h-[500px] lg:w-72 md:w-96 w-[400px] rounded-xl flex flex-col box-border text-black transition-transform transform hover:scale-105 hover:shadow-lg border border-2 border-white text-white text-left"
        >
          <div className="flex w-full px-3 items-center justify-between  border-b-2 border-[#d7d7d7]">
            <p className=" mb-[1px] text-[25px] m-0 overflow-hidden text-ellipsis whitespace-nowrap">
              {props.order.orderId}
            </p>
            <p className=" mb-[1px] text-[20px] m-0 overflow-hidden text-ellipsis whitespace-nowrap  text-[#FF1E00]">
              {props.order.cart.selectedItems.length}
            </p>
          </div>
          <div className="flex flex-col max-h-[70%] w-full items-center overflow-y-auto">
            {props.order.cart.selectedItems.map((item, index) => (
              <div
                key={index}
                className="flex w-full items-center border-b-2 border-[#d7d7d7] py-2"
              >
                <div className="flex w-auto h-3/4 items-center">
                  <img
                    src={
                      item.statusOfPreparation.statusName === "PREPARED"
                        ? "/icons/check.svg"
                        : "/icons/timerIcon.svg"
                    }
                    className="px-2 w-auto h-7"
                    alt="Check icon"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <p
                      className={`ml-1 text-xl  ${
                        item.statusOfPreparation.statusName === "PREPARED"
                          ? "text-[#59CE8F]"
                          : "text-[#77CDFF]"
                      }`}
                    >
                      {item.itemOfReference.itemName}
                    </p>
                    <p className="text-[#FF1E00] ml-4 text-xl pr-2">
                      {item.selectedItemId}
                    </p>
                  </div>
                  {item.itemCategory.categoryName === "PIZZA" ? (
                    <div className="flex w-full items-center">
                      <p className="px-[10px] ml-1 text-[15px] m-0">Size:</p>
                      <p className="px-[10px] text-[#77CDFF] text-[13px] m-0">
                        {item.sizes.size}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="flex w-full items-center">
                    <p className="px-[10px] ml-1 text-[15px] m-0">Comments:</p>
                    <p className="px-[10px] text-[#77CDFF] text-[13px] m-0">
                      {item.comment}
                    </p>
                  </div>
                  <div className="flex w-full items-center">
                    <p className="px-[10px] ml-1 text-[15px] m-0">Quantity:</p>
                    <p className="px-[10px] text-[#77CDFF] text-[17px] m-0">
                      {item.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-grow flex-col w-full justify-center border-t-2 border-[#d7d7d7]">
            <p className="px-[10px] mb-[1px]  text-[20px] m-0 w-11/12 ">
              Comments:
            </p>
            <p className="px-[10px] mb-[1px] text-[#77CDFF] text-[18px] m-0 w-11/12 ">
              {props.order.comments}
            </p>
          </div>
          <button
            disabled={!allItemsPrepared}
            onClick={() =>
              props.updateStatusOfOrder(
                props.order,
                "DELIVERING",
                4,
                props.order.customerWhoOrdered.userId
              )
            }
            className={`bg-[#59CE8F] flex border-2 border-blue-500 justify-center items-center text-white font-sans text-[17px] w-full h-[15%] min-h-12 rounded-b-[10px] hover:text-[rgb(95,95,253)] hover:bg-white ${
              !allItemsPrepared ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Ready
          </button>
        </div>
      </>
    )
  );
}
export default OrderBox;
