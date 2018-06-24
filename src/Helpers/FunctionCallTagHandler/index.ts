import { Platform } from "react-native";
import { RegisterHandler } from "./models";
import FunctionCallTagHandlerAndroid from "./FunctionCallTagHandlerAndroid";
import FunctionCallTagHandlerIOS from "./FunctionCallTagHandlerIOS";

const FunctionCallTagHandler = Platform.select<RegisterHandler>({
  ios: FunctionCallTagHandlerIOS,
  android: FunctionCallTagHandlerAndroid
});

export default FunctionCallTagHandler;
