import React, { useState,useEffect } from 'react'
import { getFirestore,collection, deleteDoc, doc, getDocs, updateDoc,addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Db} from '../Db/Db';

const Products = () => {
    const contactUseRef = collection(Db , "Products")
    const [props , setProps] = useState({
        Display : false,
        Class : "",
        Id: "",
        Name : "",
        Image : "",
        Price : 0,
        Description : ""
    })
    const [Items , setItems] = useState([])
    const fetchPost = async () => {
        await getDocs(contactUseRef)
           .then((snapshot) => {
      const newData = snapshot.docs
      .map((doc) => ({...doc.data(), id : doc.id}))
      setItems(newData)         
      })
      }
      useEffect(()=>{
        fetchPost();
      }, [])
     
      const deleteMsg = async(id) => {
        const userCon = doc(Db , "Products" ,id)
        await deleteDoc(userCon)
        if(deleteDoc) {
        toast.success("Message Has Been Deleted")
        }else{
            toast.error("Could'nt Delete The Message")
        }
        fetchPost()
        }
// Update Section

const handleChange = (e) => {
let name = e.target.name
let value = e.target.value
setProps({...props , [name] : value})

}

        const handleUpdate = (id,name,image,price,description) => {
setProps({
    Display : true,
    Class : "hidden",
    Id : id,
    Name : name,
        Image : image,
        Price : price,
        Description : description
})
        }

        const Update = (e) => {
            e.preventDefault()
            const Db = getFirestore(); // initialize Firestore
        
            const docRef = doc(Db, "Products", props.Id);
            
            const data = {
                Name : props.Name,
                Image : props.Image,
                Price : props.Price,
                Description : props.Description
            };
            
            updateDoc(docRef, data)
            .then(docRef => {
               toast.success("Details Have Been Updated")
               setProps({
                Display : false,
                Class : "",
                Id: "",
                Name : "",
                Image : "",
                Price : 0,
                Description : ""
               })
               fetchPost()
            }
          
            )
            .catch(error => {
             toast.error("Can't Update Details")
            })
            
        }
  return (
   <>
   
<ToastContainer/>
{props.Display?
 <div className="md:grid md:grid-cols-3 md:gap-6">
 <div className="md:col-span-1">
   <div className="px-4 sm:px-0 ml-3">
     <h3 className="text-2xl font-medium leading-6 text-gray-900">Update Product</h3>
     <p className="mt-1 text-sm text-gray-600">
      Update Selected Product. This Will Also Update In Database.
     </p>
   </div>
 </div>
 <div className="mt-5 md:col-span-2 md:mt-0">
    <h1 className='text-2xl float-right mr-12' onClick={() => setProps({Display:false,Class:""})}><i className="fa fa-close"></i></h1>
   <form action="#" method="POST">
     <div className="shadow sm:overflow-hidden sm:rounded-md">
       <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
         <div className="grid grid-cols-3 gap-6">
           <div className="col-span-3 sm:col-span-2">
             <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
            Name
             </label>
             <div className="mt-1 flex rounded-md shadow-sm">
               <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
               Name:
               </span>
               <input
                 type="text"
                 name="Name"
                 value={props.Name}
                 id="company-website"
                 className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange} placeholder="Example Example"
               />
             </div>
           </div>
           <div className="col-span-3 sm:col-span-2">
             <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
            Price
             </label>
             <div className="mt-1 flex rounded-md shadow-sm">
               <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
               ₹
               </span>
               <input
                 type="number"
                 name="Price"
                 value={props.Price}
                 id="company-website"
                 className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange} placeholder="₹"
               />
             </div>
           </div>
         </div>

         <div>
           <label htmlFor="about" className="block text-sm font-medium text-gray-700">
           Description
           </label>
           <div className="mt-1">
             <textarea
               value={props.Description}
               id="about"
               name="Description"
               rows={3}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={handleChange} placeholder="Example"
               defaultValue={''}
             />
           </div>
           <p className="mt-2 text-sm text-gray-500">
             Brief description for your Product.
           </p>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">Photo</label>
           <div className="mt-1 flex items-center">
             <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
             <img src={props.Image} alt="" />
             </span>
             <input
                 type="url"
                 name="Image"
                 value={props.Image}
                 id="company-website"
                 className="block rounded-lg ml-3 w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange} placeholder="www.example.png"
               />
           </div>
         </div>

       </div>
       <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
         <button
           type="submit"
           className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={Update}
         >
           Update
         </button>
       </div>
     </div>
   </form>
 </div>
</div>:""
}
   <div class={`overflow-x-auto relative shadow-md sm:rounded-lg ${props.Class} `}>
    <table class="w-full text-sm text-left text-gray-600 dark:text-gray-600">
        <thead class="text-xs text-gray-600 uppercase bg-whitedark:bg-white dark:text-gray-600">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input 
                        id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-white rounded border-white focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white"/>
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="py-3 px-6">
                    Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Price
                </th>
                <th scope="col" class="py-3 px-6">
                  Description
                </th>
                <th scope="col" class="py-3 px-6">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           {Items.map((item) => {
            return(
                <tr class="bg-white border-b dark:bg-white dark:border-white hover:bg-whitedark:hover:bg-white">
                <td class="p-4 w-4">
                    <div class="flex items-center">
                       <input 
                        id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-white rounded border-white focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white"/>
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="flex items-center py-4 px-6 text-gray-600 whitespace-nowrap dark:text-gray-600">
                    <img class="w-10 h-10 rounded-full" src={item.Image} alt="Jese image"/>
                    <div class="pl-3">
                        <div class="text-base font-semibold">{item.Name}</div>
                        <div class="font-normal text-gray-600">
                            {/* add mail here */}
                        </div>
                    </div>  
                </th>
                <td class="py-4 px-6">
                    {item.Price}
                </td>
                <td class="py-4 px-6">
                    <div class="flex items-center">
                       {item.Description}
                    </div>
                </td>
                <td class="py-4 px-6">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3" onClick={() => handleUpdate(item.id,item.Name,item.Image,item.Price,item.Description)}><i className="fa fa-edit text-blue-500 text-lg"></i></a>
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><i className="fa fa-trash text-red-500 text-lg" onClick={() => deleteMsg(item.id)}></i></a>
                </td>
            </tr>
            )
           })}
        </tbody>
    </table>
</div>

   </>
  )
}

export default Products