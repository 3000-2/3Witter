import React from "react";
import Mheader from "../header/mheader";

const Favorite = ({ favorite }) => {
  console.log(favorite);
  return (
    <>
      <Mheader page="좋아요" />
      {/* {favorite &&
        Object.keys(favorite).map((key) => <div>{favorite[key]}</div>)} */}
    </>
  );
};

export default Favorite;
