import { createSlice,current } from "@reduxjs/toolkit";
const initialState = {
    products:[],
    carts:[],
}

export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addCart:(state,action)=>{
            const {id,Title,Price,UrlImage} = action.payload
            const item = {
                id:id,
                title:Title,
                image:UrlImage,
                price:Price,
                quantity:1
            }
                const index = state.carts.findIndex(x => x.id == id);
                if(index===-1){
                    return{
                        ...state,
                        carts:[...state.carts,item]
                    }
                }else{
                    return{
                        ...state,
                        carts:state.carts.map(res=>res.id===id?{...res,quantity:res.quantity+1}:res)
                    }
                }  
        },
        IncreaseQuantity:(state,action)=>{
            return{
                ...state,
                carts:state.carts.map(item=>item.id==action.payload.id
                    ?{...item,quantity:item.quantity+1}:item)
           }
        },
        DecreaseQuantity:(state,action)=>{
            if(action.payload.quantity>1){
                return{
                    ...state,
                    carts:state.carts.map(item=>item.id==action.payload.id
                        ?{...item,quantity:item.quantity-1}:item)
                }
            }  
        },
        DeleteCart:(state,action)=>{
           return{
                ...state,
                carts:state.carts.filter(item=>item.id!=action.payload.id)
           }
        }
       
    }
});

export const {addCart,IncreaseQuantity,DecreaseQuantity,DeleteCart} = cartSlice.actions
export const selectCarts =(state) =>state.carts
export default cartSlice.reducer;