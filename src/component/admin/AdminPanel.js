import { loadBundle } from 'firebase/firestore';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AdminList from '../AdminList/AdminList';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import GoldPriceService from '../GoldPriceService/GoldPriceService';

const AdminPanel = () => {
    const {register, handleSubmit,resetField}=useForm();
    const [goldPriceInfo, setGoldPriceInfo] = useState([]);
    const load=()=>{
        document.getElementById("year").value=""
        document.getElementById("price").value="0"
    }
    async function onSubmit(data){
        //console.log(data)
        setGoldPriceInfo(data)
        try{
            await GoldPriceService.addExpense(data);
            alert("saved successfully")
            load();
        }
        catch(e){
            alert(e.message);
        }
    }
    return (
        <div>
            <AdminNavBar/>
            <br/>
            <div className='form max-w-sm mx-auto w-96'>
                
                <h1 className='font-bold pb-4 text-xl'>
                    Gold Price 
                </h1>
                
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-4'>
                        <div className='input-group'>
                            <input type="number" {...register('year')} placeholder="Year" className='form-input' id="year"/>
                        </div>
                        <div className='input-group'>
                            <input type="number" {...register('price')} placeholder="Gold Price" className='form-input' id="price"/>
                        </div>
                        <div className="submit-btn">
                            <button className="border py-2 text-white bg-indigo-500 w-full">save</button>
                        </div>
                    </div>
                </form>
                <AdminList/>
            </div>
        </div>
    );
};

export default AdminPanel;