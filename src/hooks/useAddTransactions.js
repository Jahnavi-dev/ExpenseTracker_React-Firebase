import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {db} from "../config/firebaseConfig"
import {userGetUserInfo} from "./useGetUserInfo"
export const useAddTransactions=()=>{
    const transactionCollectionReference=collection(db, "transaction")
    const {userID}=userGetUserInfo();
    const addTransaction=async ({
        description, 
        transactionAmount,
        transactionType} )=>{
        await addDoc(transactionCollectionReference, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt:serverTimestamp()
        })
    }
    return {addTransaction };
}