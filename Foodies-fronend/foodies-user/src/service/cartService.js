import axios from "axios";
const CART_API_URL = "https://foodeeshub.up.railway.app/api/cart";

export const addToCart = async (foodId,token)=>{
    try{
        await axios.post(CART_API_URL,{foodId},{headers: {"Authorization":`Bearer ${token}`}});
    } catch(error){
        console.log('Error while adding item to cart:',error);
    }
}

export const removeQtyFromCart = async (foodId,token)=>{
    try{
        await axios.post(`${CART_API_URL}/remove`,{foodId},{headers: {"Authorization":`Bearer ${token}`}});
    } catch(error){
        console.log('Error while removing from cart:',error);
    }
}

export const getCart = async (token)=>{
    try{
        return await axios.get(CART_API_URL,{headers:{"Authorization":`Bearer ${token}`}});
    } catch(error){
        console.log('Error while getting cart:',error);
    }
}