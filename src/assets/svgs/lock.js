import React from "react";
import Svg, { Path } from "react-native-svg";

function LockIcon() {
  return (
    <Svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M3 8V6C3 2.687 5.687 0 9 0C12.312 0 15 2.687 15 6V8H13V6C13 3.794 11.205 2 9 2C6.795 2 5 3.794 5 6V8H3ZM0 10V24H18V10H0Z" fill="#B2BE35"/>
    </Svg>
  );
}

export default LockIcon;
