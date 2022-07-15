import { Text, View } from "react-native"
import { useEffect } from "react";
import { DisplayMessageProps } from "../models/interface";

const DisplayMessage : React.FC<DisplayMessageProps> = ({message, duration, hideMessage})=> {
    useEffect(()=>{
        setTimeout(()=>hideMessage(),duration)
    },[])
    return (
        <View>
            <Text>{{message}}</Text>
        </View>
    )
}
export default DisplayMessage;