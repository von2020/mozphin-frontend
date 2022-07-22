import React from "react";
import Svg, { Path } from "react-native-svg";

function CheckCloseIcon(props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M22 2V22H2V2H22ZM24 0H0V24H24V0Z" fill={props.red == "red" ? "red" : "#B2BE35"}/>
    </Svg>
  );
}

export default CheckCloseIcon;