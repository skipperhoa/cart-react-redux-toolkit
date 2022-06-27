import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {IncreaseQuantity,DecreaseQuantity, DeleteCart} from './cartSlice'
//https://codesandbox.io/s/fkb5d?file=/src/store/selectors.js
export default function Cart() {
  const dispatch = useDispatch();
  const {carts} = useSelector(state=>state.carts);
  const [totalPrice,setTotalPrice] = useState(0);
  let TotalCart=0;
  const sumPrice = () => {
    carts.map(item=>{
        TotalCart+=TotalCart+=(item.price * item.quantity)
    });
  }
  sumPrice();
  const renderItem = (item) => {
     return(
        <li key={item.id} className='flex flex-row mt-5'>
            <img className='block w-full max-w-[130px]' src={item.image} />
            <div className='w-auto pl-2'>
                <span className='text-sm font-semibold block py-1'>{item.title}</span>
                <small className='block py-1 text-sm'>Price:<strong className='text-red-500 '>{Number(item.price).toLocaleString('en-US')} đ</strong></small>
                <div className='w-auto flex flex-row justify-start items-center mt-2'>
                    <button className='w-8 cursor-pointer p-1 bg-black block text-red-500 text-center' onClick={()=>dispatch(DecreaseQuantity(item))}>-</button>
                    <span className='px-2'>{item.quantity}</span>
                    <button className='w-8 cursor-pointer p-1 bg-black block text-red-500 text-center' onClick={()=>dispatch(IncreaseQuantity(item))}>+</button>
                    <span className='block py-1 text-sm pl-2'>Total price:<strong className='text-red-500 '>{Number(item.price * item.quantity).toLocaleString('en-US')} đ</strong></span>
                    <span className='text-red-500 pl-10' onClick={()=>dispatch(DeleteCart(item))}><i class="fas fa-trash-alt"></i></span>
                </div>
                
            </div>
        </li>
     )
  }
  return (
    <div className='w-full container max-w-xl mx-auto'>
        <h1 className='text-xl pl-2 mt-5'>List Carts:</h1>
        <nav className='mt-5'>
            <ul className='flex flex-col'>
               {
                 carts?.length>0 && carts.map((item,index)=>renderItem(item))
               }
            </ul>
        </nav>
        <div className='w-full bg-green-500 py-2 mt-5'>
            <h2 className='pl-2 text-white'>Total:<span className='text-red-600 font-semibold pl-2'>{Number(TotalCart).toLocaleString('en-US')} đ</span></h2>
        </div>
    </div>
  )
}
