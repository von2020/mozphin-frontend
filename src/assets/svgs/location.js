import React from "react";
import Svg, { Path, G, Rect, ClipPath, Defs } from "react-native-svg";

function LocationIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_335_1105)">
    <Path d="M12 1C8.852 1 6 3.553 6 6.702C6 9.85 8.602 13.609 12 19C15.398 13.609 18 9.85 18 6.702C18 3.553 15.149 1 12 1ZM12 9C10.895 9 10 8.105 10 7C10 5.895 10.895 5 12 5C13.105 5 14 5.895 14 7C14 8.105 13.105 9 12 9ZM20 15H16.865C16.48 15.641 16.067 16.309 15.633 17H18.764L19.264 18H15L14.656 18.544L14.367 19H14.925L15.783 21H8.295L9.153 19H9.632L9.343 18.544L9 18H6.958L5.947 17H8.367C7.932 16.309 7.519 15.641 7.135 15H4L0 23H24L20 15ZM7.206 21H3.236L5 17.472L6.516 19H8.065L7.206 21ZM16.014 19H19.764L20.764 21H16.872L16.014 19Z" fill="#B2BE35"/>
    </G>
    <Defs>
    <ClipPath id="clip0_335_1105">
    <Rect width="24" height="24" fill="white"/>
    </ClipPath>
    </Defs>
    </Svg>

  );
}

export default LocationIcon;
