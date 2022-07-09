import { Image, Text, TouchableWithoutFeedback, View, Modal } from "react-native"
import { StorageAccessFramework, getInfoAsync, FileInfo } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';

const Home : React.FC = ()=>{

    const [whatsappImageUri, setWhatsappImageUri] = useState<string[]>([])
    const [whatsappVidUri, setWhatsappVidUri] = useState<string[]>([])
    const [modalUri, setModalUri] = useState<string|null>(null)
    const [message, setMessage] = useState<string | null>(null)
    let [status, requestPermission] = MediaLibrary.usePermissions();
    const [storagePermission, setStoragePermission] = useState<any>(false)
    const whatsappStatusDir = "content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fmedia%2Fcom.whatsapp%2FWhatsApp%2FMedia%2F.Statuses"
    
    const getStatusMedia = async ()=>{
        try{
            const assets = await StorageAccessFramework.readDirectoryAsync(whatsappStatusDir)
            console.log(assets,whatsappStatusDir)
            const newImageUri: string[] = [], newVidUri: string[] = [];
            assets.forEach((uri:string)=>{
                if(uri.endsWith("jpg")) newImageUri.push(uri)
                else if(uri.endsWith("mp4")) newVidUri.push(uri) 
            })
            setWhatsappImageUri(newImageUri)
            setWhatsappVidUri(newVidUri)
        } catch(e){
            displayMessage("access denied")
            console.log(e)
        }
    }

    const handleSave = async (uri : string)=>{

        // FileSystem.documentDirectory
        const statusDir = FileSystem.documentDirectory + 'WhatsApp Status'
        await FileSystem.makeDirectoryAsync(statusDir,{intermediates:true})

        await FileSystem.copyAsync({from: uri, to: statusDir })
        const assets = await FileSystem.readDirectoryAsync(statusDir)
        console.log(assets, statusDir)
        displayMessage("Photo saved")
    }

    const displayMessage = (msg : string) => {
        setMessage(msg)
        setTimeout(()=>setMessage(null),2000)
    }

    useEffect(()=>{
        getStatusMedia()
    },[])
    
    return(
        <View style={{borderWidth: 1, borderColor : "black", width: 300, height: 600}}>
            <Text>WhatsApp status</Text>
            <View style={{borderWidth: 1, borderColor : "black"}}>

            {whatsappImageUri.map((uri:string, idx: number)=>{
                return(
                    <TouchableWithoutFeedback key={idx} onPress={()=>setModalUri(uri)}>
                        <Image key={idx} style={{borderWidth: 1, borderColor : "black", width:100, height:100}} source={{uri : uri}}/>
                    </TouchableWithoutFeedback>
                )
            })}

            {
            modalUri ? 
                <Modal
                animationType="slide"
                transparent={false}
                onRequestClose={() => setModalUri(null)}
                >
                    <TouchableWithoutFeedback onPress={()=>handleSave(modalUri)}>
                        <FontAwesome name="download" size={24} color="black" />
                    </TouchableWithoutFeedback>
                    <Image source={{uri : modalUri}} style={{borderWidth: 1, borderColor : "black", width:100, height:100}}/>
                </Modal> : null
            }

            {
                message ? 
                <View>
                    <Text>{{message}}</Text>
                </View> :
                null
            }
            
            </View>
        </View>
    )
}

export default Home;