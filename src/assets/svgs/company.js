import React from "react";
import Svg, { Path, G, Defs, Rect, ClipPath } from "react-native-svg";

function CompanyIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clip-path="url(#clip0_335_1986)">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M24 24H0V22H24V24ZM23 21H1V20H23V21ZM6 19.001H2V13C1.448 13 1 12.552 1 12C1 11.448 1.448 11 2 11H6C6.552 11 7 11.448 7 12C7 12.552 6.552 13 6 13V19.001ZM14 19.001H10V13C9.448 13 9 12.552 9 12C9 11.448 9.448 11 10 11H14C14.552 11 15 11.448 15 12C15 12.552 14.552 13 14 13V19.001ZM22 19.001H18V13C17.448 13 17 12.552 17 12C17 11.448 17.448 11 18 11H22C22.552 11 23 11.448 23 12C23 12.552 22.552 13 22 13V19.001ZM24.001 10H0L12 0L24.001 10ZM5.524 8H18.477L12 2.603L5.524 8ZM11.995 4C12.961 4 13.745 4.784 13.745 5.75C13.745 6.716 12.961 7.5 11.995 7.5C11.029 7.5 10.245 6.716 10.245 5.75C10.245 4.784 11.029 4 11.995 4Z" fill="#B2BE35"/>
        </G>
        <Defs>
            <ClipPath id="clip0_335_1986">
                <Rect width="24" height="24" fill="white"/>
            </ClipPath>
        </Defs>
    </Svg>
  );
}

export default CompanyIcon;
