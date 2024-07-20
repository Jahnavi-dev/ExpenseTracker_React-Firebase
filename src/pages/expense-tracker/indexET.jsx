import { useState } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions"
import {useGetTransactions} from "../../hooks/useGetTransactions"
import { userGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker=()=>{
    const {addTransaction}=useAddTransactions();
    const {transactions, transactionTotals}=useGetTransactions();
    const {name, profilePhoto}=userGetUserInfo()
    const navigate=useNavigate();

    const [description, setDescription]=useState("");
    const [transactionAmount, setTransactionAmount]=useState(0);
    const [transactionType, setTransactionType]=useState("expense");

    const {balance, income, expense}=transactionTotals;

    const onSubmit=async(e)=>{
        e.preventDefault()
        addTransaction(
            {description, transactionAmount, transactionType}
        );
        setDescription("")
        setTransactionAmount(0)

    }

    const signUserOut=async()=>{
        try {
            await signOut(auth)
            localStorage.clear()
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1>{ name } Expense Tracker</h1>
                    <div className="balance">
                        <h3>Your Balance</h3>
                        {balance>=0?(<h2>${balance}</h2>):
                        (<h2>-${balance*-1}</h2>)}
                        
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p>${income}</p>
                        </div>
                        <div className="expenses">
                            <h4>Expenses</h4>
                            <p>${expense}</p>
                        </div>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input type="text" placeholder="Description" value={description} required onChange={(e)=>setDescription(e.target.value)}/>
                        <input type="number" placeholder="Amount" value={transactionAmount} required onChange={(e)=>setTransactionAmount(e.target.value)}/>
                        <input type="radio" id="expense" value="expense" checked={transactionType==="expense"} onChange={(e)=>setTransactionType(e.target.value)}/>
                        <label htmlFor="expense">Expense</label>
                        <input type="radio" id="income" value="income" checked={transactionType==="income"} onChange={(e)=>setTransactionType(e.target.value)}/>
                        <label htmlFor="income">Income</label>

                        <button type="submit">Add Transaction</button>
                        
                    </form>
                </div>
                
                {profilePhoto&&(
                    <div className="profile">
                        <img className="profile-photo" src={profilePhoto} alt="profile"/>
                        <button className="sign-out-button" onClick={signUserOut}>SignOut</button>
                        </div>
                )}
            </div>
            <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction)=>{
                        const{description, transactionAmount, transactionType}=transaction;
                        return(
                            <li>
                                <h4>{description}</h4>
                                <p>
                                     ${transactionAmount}.<label style={{color:transactionType==="expense"?"red":"green"}}>{transactionType}</label>
                                </p>
                            </li>
                        )
                    })}
                    
                </ul>
            </div>
        </>
    )
}
