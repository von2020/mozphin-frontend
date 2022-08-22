import React, { useRef, useState, useEffect } from "react";
import { OTPInputContainer, TextInputHidden, SplitOTPBoxesContainer, SplitBoxes, SplitBoxText, SplitBoxesFocused } from "./Styles";

const OTPInput = ({ code, setCode, maximumLength, setIsPinReady }) => {
    const boxArray = new Array(maximumLength).fill(0);
    const inputRef = useRef();
    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
    
    const handleOnPress = () => {
      setIsInputBoxFocused(true);
      inputRef.current.focus();
      };

      const handleOnBlur = () => {
        setIsInputBoxFocused(false);
      };

    //B2BE35
    useEffect(() => {
        // update pin ready status
        setIsPinReady(code.length === maximumLength);
        // clean up function
        return () => {
          setIsPinReady(false);
        };
      }, [code]);
  
    const boxDigit = (_, index) => {
        
        const emptyInput = "";
        const digit = code[index] || emptyInput;
     
        const isCurrentValue = index === code.length;
        const isLastValue = index === maximumLength - 1;
        const isCodeComplete = code.length === maximumLength;
     
        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);
     
        const StyledSplitBoxes =
          isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;
        return (
          <StyledSplitBoxes key={index}>
            <SplitBoxText>{digit}</SplitBoxText>
          </StyledSplitBoxes>
        );
    }
  
    return (
      <OTPInputContainer>
        <SplitOTPBoxesContainer>{boxArray.map(boxDigit)}</SplitOTPBoxesContainer>
        <TextInputHidden
          value={code}
          onChangeText={setCode}
          keyboardType={"numeric"}
          maxLength={maximumLength}
          ref={inputRef}
          onBlur={handleOnBlur}
        />
      </OTPInputContainer>
    );
   };

export default OTPInput;