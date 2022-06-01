import React, { createContext, useContext, useEffect, useState } from 'react';
import 'boxicons'
import { useNavigate } from 'react-router-dom';
import NewFeatureService from '../NewFeatureService/NewFeatureService';


export const expenseContext = createContext();
const NewFeatureList = (props) => {
    const [trans, setTrans] = useState([])
    const navigate = useNavigate()
    const [totalSavingsInMoney, setTotalSavingsInMoney] = useState(0);
    const [totalSavingsInGold, setTotalSavingsInGold] = useState(0);
    const [savingsGoldPriceInMoney, setSavingsGoldPriceInMoney] = useState(0);

    const m = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    useEffect(() => {
        getExpense();

    }, [trans])
    const getExpense = async () => {
        const data = await NewFeatureService.getAllExpense();
        setTrans(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    // const logout = () =>{
    //     navigate('/')
    // }
    const calculate = () => {
        let SavingsMoney = 0;
        let SavingsGold = 0;

        trans.map(item => {
            SavingsMoney += parseInt(item.SavingMoney);
            SavingsGold += parseFloat(item.SavingsGold);
        })
        console.log(trans);
        const CurrentGoldPrice = trans.find(item => item.Month.toLowerCase() === m[new Date().getMonth() + 1])

        const SavingsGoldPriceInMoney = SavingsGold * parseFloat(CurrentGoldPrice.GoldPrice)
        console.log(SavingsGold, SavingsMoney, SavingsGoldPriceInMoney, SavingsGoldPriceInMoney - SavingsMoney);
        setTotalSavingsInMoney(SavingsMoney);
        setTotalSavingsInGold(SavingsGold);
        setSavingsGoldPriceInMoney(SavingsGoldPriceInMoney);
    }
    return (
        <div className='flex flex-col py-6 gap-3'>
            <h1 className='py-4 font-bold text-xl'>Gold Price History</h1>
            <div className='item flex justify-content-between text-white py-2 rounded-r bg-red-500'>
                <span className='mx-2'>Del</span>
                <span className='w-1/2'>Gold Price</span>
                <span className='w-1/2'>Month</span>
                <span className='w-1/2'>Salary</span>
                <span className='w-1/2'>Expense</span>
                <span className='w-1/2'>Savings In Money</span>
                <span className='w-1/2'>Savings In Gold</span>
            </div>
            {trans.map((item, index) => {
                return (<expenseContext.Provider value={[trans, setTrans]}>
                    <Transaction item={item} key={index}></Transaction>
                </expenseContext.Provider>);
            })}
            <button className="border py-2 text-white bg-red-500 w-full" onClick={calculate}>Calculate Difference Between Savings in Money and Savings in Gold </button>
            <div className='item flex justify-content-between m-6 bg-gray-50 py-2 rounded-r'>
                <span className='w-48'>Total Savings in Money</span>
                <span className='w-96'>{totalSavingsInMoney}</span>
            </div>
            <div className='item flex justify-content-between m-6 bg-gray-50 py-2 rounded-r'>
                <span className='w-48'>Total Savings in Gold</span>
                <span className='w-96'>{totalSavingsInGold}</span>
            </div>
            <div className='item flex justify-content-between m-6 bg-gray-50 py-2 rounded-r'>
                <span className='w-48'>Total Current Price of Saved Gold</span>
                <span className='w-96'>{savingsGoldPriceInMoney}</span>
            </div>
            <div className='item flex justify-content-between m-6 bg-gray-50 py-2 rounded-r'>
                <span className='w-48'>Difference Between Saved Gold Price and Saved Money</span>
                <span className='w-96'>{savingsGoldPriceInMoney - totalSavingsInMoney}</span>
            </div>

        </div>
    );
};


function Transaction({ item }) {
    const [trans, setTrans] = useContext(expenseContext);
    const delete_item = async (id) => {
        console.log(id);
        try {
            await NewFeatureList.deleteExpense(id);
            setTrans(trans.filter(product => product.id !== id))

        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className='item flex justify-content-between bg-gray-50 py-2 rounded-r'>

            <button className='px-3' onClick={() => delete_item(item.id)}><box-icon size="15" name="trash"></box-icon></button>
            <span className='w-48'>{item.GoldPrice ?? ""}</span>
            <span className='w-48'>{item.Month ?? ""}</span>
            <span className='w-48'>{item.Salary ?? ""}</span>
            <span className='w-48'>{item.Cost ?? ""}</span>
            <span className='w-48'>{item.SavingMoney ?? ""}</span>
            <span className='w-48'>{item.SavingsGold ? item.SavingsGold.toFixed(2) : ""}</span>
        </div>
    )
}
export default NewFeatureList;