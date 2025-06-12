import axios from "axios";

const API_URL = "https://foodeeshub.up.railway.app/api/food";

export const addFood = async (foodData, image) => {
  const formData = new FormData();
  formData.append("food", JSON.stringify(foodData));
  formData.append("file", image);

  try {
    await axios.post(API_URL+"/add-food", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.log("Error while adding food: ", error);
    throw error;
  }
};

export const getFoodList = async () => {
  try {
    const response =  await axios.get(API_URL+"/get-foods");
    return response.data;
  } catch (error) {
    console.log("Error while fetching the food list: ", error);
    throw error;
  }
};

export const deleteFood = async(id)=>{
  try{
    const response =  await axios.delete(API_URL+"/delete-food/"+id);
    return response.status == 200;
  }catch(error){
    console.log("Error while deleting food: ",error);
    throw error;
  }
}
