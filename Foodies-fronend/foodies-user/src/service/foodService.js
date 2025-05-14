import axios from "axios";

const API_URL = "http://localhost:8080/api/food"

export const fetchFoodList = async() => {
    try{
        const response = await axios.get(API_URL+'/get-foods');
        return response.data;
    }catch(error){
        console.log('Error fetching food list: ',error);
        throw error;
    }
}

export const fetchFood = async(id) => {
    try{
        const response = await axios.get(API_URL+`/get-food/${id}`);
        return response.data;
    } catch(error){
        console.log(error);
        throw error;
    }
}