import React, { createContext, useContext, useEffect, useState } from 'react';
import 'boxicons'
import GoldPriceService from '../GoldPriceService/GoldPriceService';
import { useNavigate } from 'react-router-dom';


export const expenseContext = createContext();
const AdminList = () => {
    const [trans,setTrans] = useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        getExpense();
        
    },[trans])
    const getExpense= async()=>{
        const data = await GoldPriceService.getAllExpense();
        setTrans(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        
    }
    const logout = () =>{
        navigate('/')
    }
    return (
        <div className='flex flex-col py-6 gap-3'>
            <h1 className='py-4 font-bold text-xl'>Gold Price History</h1>
            {trans.map((item,index)=>{
                return (<expenseContext.Provider value={[trans,setTrans]}>
                    <Transaction item={item} key={index}></Transaction>
                </expenseContext.Provider>);
            })}    
            <button className="border py-2 text-white bg-red-500 w-full" onClick={logout}>Logout</button> 
        </div>
    );
};

function Transaction({item}){
    const [trans,setTrans] = useContext(expenseContext);
    const delete_item= async(id)=>{
        console.log(id);
        try{
            await GoldPriceService.deleteExpense(id);
            setTrans(trans.filter(product=>product.id!==id))    
            
        }
        catch(e){
            console.log(e);
        }        
    }
    return (
        <div className='item flex justify-content-between bg-gray-50 py-2 rounded-r'>
            <button className='px-3' onClick={()=>delete_item(item.id)}><box-icon size="15" name="trash"></box-icon></button>
            <span className='w-1/2'>{item.year??""}</span>
            <span className='w-1/2'>{item.price??""}</span>
        </div>
    )
}
export default AdminList;