import React, { useEffect, useState } from "react";

function OutputList({ output, setSelectedUserId }) {
  return (
    <div className="bg-gray-700 w-10/12 h-4/6 border-2 rounded border-black overflow-scroll">
      {output.length !== 0 ? (
        output.map((item, index) => (
          <div
            className="h-8 mb-2 w-full bg-white text-start px-2 hover:bg-gray-400"
            key={item.userId}
            onClick={(e) => setSelectedUserId(item.userId)}
          >
            {item.userId} - {item.firstName} {item.lastName}
          </div>
        ))
      ) : (
        <>No Results Found</>
      )}
    </div>
  );
}

export default OutputList;
