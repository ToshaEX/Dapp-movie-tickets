import React from "react";

interface Props {
  text: string;
}
const Heading = ({ text }: Props) => {
  return <h5 className="m-5 text-3xl text-gray-600 font-semibold">{text}</h5>;
};

export default Heading;
