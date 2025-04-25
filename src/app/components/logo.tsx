import Image from "next/image";
import React from "react";

const Logo = () => {
  return <Image src={"/logo.svg"} height={30} width={30} alt='logo' />;
};

export default Logo;
