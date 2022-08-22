import styled from "styled-components/native";

export const SplitOTPBoxesContainer = styled.Pressable`
 width: 95%;
 flex-direction: row;
 justify-content: space-evenly;
`;
export const SplitBoxes = styled.View`
 border-color: #002A14;
 border-width: 1px;
 border-radius: 5px;
 padding: 5px;
 min-width: 38px;
 width: 38px;
 height: 37px;
`;

export const SplitBoxText = styled.Text`
 font-size: 20px;
 text-align: center;
 color: #002A14;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
 border-color: #B2BE35;
 background-color: grey;
`;

export const OTPInputContainer = styled.View`
 justify-content: center;
 align-items: center;
`;

export const ButtonContainer = styled.TouchableOpacity`
 background-color: #d8e9a8;
 padding: 20px;
 justify-content: center;
 align-items: center;
 width: 200px;
 margin-top: 30px;
`;

export const ButtonText = styled.Text`
 color: black;
 font-size: 20px;
`;

export const TextInputHidden = styled.TextInput`
position: absolute;
opacity: 0;
`;