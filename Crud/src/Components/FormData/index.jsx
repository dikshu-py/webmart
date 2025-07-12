import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../ApiClient/ApiClient';
const index = () => {
    //form to save data 
    const [formdata,setFormdata] = useState({
        name : "",
        category : "",
        brand : "",
        price : '',
        detail : "",
        image : ""
    })
     const { id } = useParams();
     console.log(id)
    const navigate = useNavigate()
    //function to save for data on click Command 
    const handleSubmit = async (e)=>{
        e.preventDefault();
       
       

        if(id){
            await ApiClient.put(`http://localhost:3000/edit/${id}`,formdata).then((res)=>{
                console.log(res)
                navigate("/")
                
    
            }).catch((err)=> console.log(err))

        }else{
            const res = await ApiClient.post("http://localhost:3000/add-products",formdata).then((res)=>{
                console.log(res)
                navigate("/")
                
    
            }).catch((err)=> console.log(err))

        }
    }
    
    // to get the details if id is present
    useEffect(()=>{
        if (id){
            getdetails();
        }
       

    },[id])

    const getdetails = async()=>{
        const res = await ApiClient.get(`http://localhost:3000/detail/${id}`).then((res)=>{
            if(res.data.success){
                console.log(res.data.data)
                const item = res.data.data
                setFormdata({
                    name : item.name,
                    category :item.category,
                    brand : item.brand,
                    price : item.price,
                    detail :item.detail,
                    image : item.image || "",
                })
            }
           
        })
    }
    const [file, setFile] = useState(null);
    const handleChange = (e) => {
        setFile(e.target.files[0]);
      };

    const handleUpload = async () => {
        if (!file) return alert('Please select an image first.');
        
        const formData = new FormData();
        formData.append('image', file);
    
        try {
          const res = await ApiClient.post('http://localhost:3000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          setFormdata({...formdata, image : res.data.imageUrl})
        } catch (err) {
          alert('Upload failed');
          console.error(err);
        }
      };
    

   

  return (
    <div class="bg-white border border-4 rounded-lg shadow relative m-10 text-left mt-20">
       

    <div class="flex items-start justify-between p-5 border-b rounded-t">
        <h3 class="text-xl text-black font-semibold">
            Edit product
        </h3>
        {/* <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button> */}
    </div>
    
    
    <div class="p-6 space-y-6">
        <form onSubmit={handleSubmit}>
        
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                    <label for="product-name" class="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                    <input value={formdata.name} type="text" onChange={(e)=> setFormdata({...formdata, name:e.target.value})   }  name="product-name" id="product-name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple Imac 27”" required/>
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Category</label>
                    <input value={formdata.category} type="text" onChange={(e)=> setFormdata({...formdata, category:e.target.value})   }    name="category" id="category" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Electronics" required/>
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <label for="brand" class="text-sm font-medium text-gray-900 block mb-2">Brand</label>
                    <input value={formdata.brand} type="text" onChange={(e)=> setFormdata({...formdata, brand:e.target.value})   }    name="brand" id="brand" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple" required/>
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <label for="price" class="text-sm font-medium text-gray-900 block mb-2">Price</label>
                    <input value={formdata.price} type="number" onChange={(e)=> setFormdata({...formdata, price:e.target.value})   }      name="price" id="price" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="$2300" required/>
                </div>
               
                <div class="col-span-full">
                    <label for="product-details" class="text-sm font-medium text-gray-900 block mb-2">Product Details</label>
                    <textarea value={formdata.detail} id="product-details" onChange={(e)=> setFormdata({...formdata, detail:e.target.value})   }      rows="6" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
                </div>
                
                <div className='text-black'>
                    {
                        !formdata.image && 
                        <div>

                        <input type="file" onChange={handleChange} accept="image/*" />
                        <button type='button' onClick={handleUpload}>Upload</button></div>
                    }
                   
                    {formdata.image && (
                        <div>
                        <p>Uploaded Image:</p>
                        <img src={formdata.image} alt="Uploaded" width="200" />
                        </div>
                    )}
                    </div>
            </div>
            <div class="p-6 border-t border-gray-200 rounded-b">
        <button class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save all</button>
    </div>
        </form>
    </div>

   

</div>
  )
}

export default index