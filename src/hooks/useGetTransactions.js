
import { useEffect, useState } from "react"
import {query, collection, where, orderBy, onSnapshot} from 'firebase/firestore'
import {db} from "../config/firebaseConfig" 
import {userGetUserInfo} from './useGetUserInfo'

export const useGetTransactions=()=>{
    const [transactions, setTransactions]=useState([]);
    const [transactionTotals, setTransactionTotals]=useState({balance:0.0, income:0.0, expense:0.0});


    const transactionCollectionReference=collection(db, "transaction")
    const{userID}=userGetUserInfo()

    const getTransactions=async()=>{
        let unSubscribe;
        try{
            const queryTransactions = query(
                transactionCollectionReference, 
                where("userID", "==", userID),
                orderBy("createdAt"));
            unSubscribe=onSnapshot(queryTransactions, (snapShot)=>{
                let docs=[]; 
                let totalIncome=0;
                let totalExpenses=0;

                snapShot.forEach((doc)=>{
                    const data = doc.data();
                    const id=doc.id

                    docs.push({...data, id});
                    if(data.transactionType==="expense"){
                        totalExpenses+=Number(data.transactionAmount)
                    }   
                    else{totalIncome+=Number(data.transactionAmount)}             

                });
                setTransactions(docs);
                let balance=totalIncome-totalExpenses;
                setTransactionTotals({
                    balance:balance,
                    expense:totalExpenses,
                    income:totalIncome
                })
            });      
        }
        catch(err){
            console.log(err)
        }
        return ()=>unSubscribe();

    }
    useEffect(()=>{
        getTransactions()
    },[])
    return {transactions, transactionTotals }
}