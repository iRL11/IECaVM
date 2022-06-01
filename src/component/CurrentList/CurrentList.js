import React, { createContext, useContext, useEffect, useState } from 'react';
import ExpenseService from '../expenseService/Expense.Service';
import 'boxicons'
import { userContext } from '../../App';

export const expenseContext = createContext();
const CurrentList = (props) => {
    const [trans,setTrans] = useState([])
    const [user,,,]=useContext(userContext);
    useEffect(()=>{
        getExpense();
        
    },[trans])
    const getExpense= async()=>{
        const data = await ExpenseService.getAllExpense();
        const filterData = data.docs.map((doc)=>({...doc.data(),id:doc.id}));
        setTrans(filterData.filter(item=>item.email===user.email))
    }
    return (
        <div className='flex flex-col py-6 gap-3'>
            <h1 className='py-4 font-bold text-xl'>Transaction History</h1>
            {trans.map((item,index)=>{
                return (<expenseContext.Provider value={[trans,setTrans]}>
                    <Transaction item={item} key={index}></Transaction>
                </expenseContext.Provider>);
            })}    
        </div>
    );
};

function Transaction({item}){
    const [trans,setTrans] = useContext(expenseContext);
    const delete_item= async(id)=>{
        try{
            await ExpenseService.deleteExpense(id);
            setTrans(trans.filter(product=>product.id!==id))    
        }
        catch(e){
            alert(e.message);
        }        
    }
    
    if(item.type==="")return null;
    return (
        <div className='item flex justify-content-between bg-gray-50 py-2 rounded-r' style={{borderRight: `8px solid ${item.type==='income'?"green":item.type==='savings'?"blue":"red"}`}}>
            <button className='px-3' onClick={()=>delete_item(item.id)}><box-icon color={item.type==='income'?"green":item.type==='savings'?"blue":"red"} size="15" name="trash"></box-icon></button>
            <span className='w-24'>{item.date??""}</span>
            <span className='w-24'>{item.name??""}</span>
            <span className='w-24'>{item.type??""}</span>
            <span className='w-24'>{item.amount??""}</span>
        </div>
    )
}
export default CurrentList;