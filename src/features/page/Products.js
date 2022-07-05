import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import callApi from '../../api';
import { useGetProductsQuery } from '../../services';
import { addCart, selectCarts } from '../cart/cartSlice';
const Products = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.carts)
  //console.log(useSelector((state)=>selectCarts(state)));
  const [items,setItems] = useState([]);
  const {data,isLoading} = useGetProductsQuery();
  useEffect(() => {
    if(!isLoading && data){
        let result = data;
        setItems(JSON.parse(result.data));  
    }  
  }, [isLoading])

  const add_cart = (item)=>{
   // console.log(item)
    dispatch(addCart(item));
  }
  
  return (
    <div className='w-full container max-w-3xl mx-auto'>
        <div className='w-full mt-5'>
            <nav>
                <ul className='grid grid-cols-3 gap-1'>

                  {
                     items?.length>0 && items.map((product,index)=>{
                        return  <li key = {product.id} className='border border-gray-100 p-2'>
                                    <img  className='w-44 h-44 block mx-auto' src={product.UrlImage} />
                                    <span className='font-semibold py-2 block text-center text-[13px]'>{product.Title}</span>
                                    <button className='bg-green-600 p-2 text-center text-white w-full' onClick={()=>add_cart(product)} data-id={product.id}>Add Cart</button>
                                </li>
                     })
                  }  
                  
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Products