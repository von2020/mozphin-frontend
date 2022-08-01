import React from "react";
import Svg, { Path } from "react-native-svg";

function PaymentIcon(props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M8 12C8 8.21486 9.792 5.14286 12 5.14286C14.209 5.14286 16 8.21486 16 12C16 15.7851 14.209 18.8571 12 18.8571C9.792 18.8571 8 15.7851 8 12ZM11.2645 11.1252L10.8956 10.6601C10.8668 10.6252 10.8411 10.5975 10.8185 10.577C10.7958 10.5565 10.7722 10.5411 10.7475 10.5308C10.7228 10.5185 10.6951 10.5103 10.6642 10.5062C10.6334 10.5021 10.5953 10.5 10.5501 10.5H10.001V11.7923H9.4375V12.7923H10.001V12.9472H9.4375V13.9472H10.001V14.987H10.9203V13.9472H12.331L13.0179 14.8145C13.0713 14.8781 13.1248 14.9233 13.1783 14.95C13.2338 14.9746 13.3017 14.987 13.3819 14.987H13.9248V13.9472H14.4502V12.9472H13.9248V12.7923H14.4502V11.7923H13.9248V10.5H13.0055V11.7923H11.7938L11.6184 11.5712L11.2645 11.1252ZM13.0062 12.9472C13.0058 12.9223 13.0055 12.8981 13.0055 12.8744V12.7923H12.5871L12.7099 12.9472H13.0062ZM11.5392 12.9472L11.4165 12.7923H10.9203V12.9472H11.5392ZM0 24V0H24V24H0ZM19.422 20.5714C19.926 18.5983 20.849 17.016 22 16.152V7.848C20.849 6.984 19.926 5.40171 19.422 3.42857H4.578C4.074 5.40171 3.151 6.984 2 7.848V16.152C3.151 17.016 4.074 18.5983 4.578 20.5714H19.422Z" fill={props.color}/>
    </Svg>

  );
}

export default PaymentIcon;