import axios from 'axios';
import { productsFail,productsSuccess,productsRequest } from '../slices/productsSlice';
import { productFail,productSuccess,productRequest, createReviewRequest, createReviewSuccess, createReviewFail } from '../slices/productSlice';
export const getProducts=(keyword,category,currentPage)=>async(dispatch)=>{
    try{
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${currentPage}`;
        
        if(keyword){
            link +=`&keyword=${keyword}`
        }
        if(category){
            link+=`&category=${category}`
        }
        const { data }  =  await axios.get(link);
        dispatch(productsSuccess(data))
    }catch(error){
       dispatch(productsFail(error.response.data.message))
    }
    
}


export const getProduct= id=>async(dispatch)=>{
    try{
        dispatch(productRequest())
        const{data}= await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))
    }catch(error){
       dispatch(productFail(error.response.data.message))
    }
    
}

export const createReview = reviewData => async (dispatch) => {

    try {  
        dispatch(createReviewRequest()) 
        const config = {
            headers : {
                'Content-type': 'application/json'
            }
        }
        const { data }  =  await axios.put(`/api/v1/review`,reviewData, config);
        dispatch(createReviewSuccess(data))
    } catch (error) {
        dispatch(createReviewFail(error.response.data.message))
    }
    
}