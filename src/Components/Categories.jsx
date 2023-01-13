import React, { useState , useEffect } from 'react'
import { getFirestore,collection, deleteDoc, doc, getDocs, updateDoc,addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Db} from '../Db/Db';

const Categories = () => {
    const contactUseRef = collection(Db , "Category")
    const [Category , SetCategory] = useState({
        Category : ""
    })
    const [Categ , SetCateg] = useState([])
    
   
    const AddCategory = async(e) => {
        e.preventDefault()
        try {
            const docRef = await addDoc(collection(Db, "Category"), {
               Category : Category.Category,
                },    
           )
            const id = docRef.id
            toast.success("Category Has Been Added")
            SetCategory({
               Category : ""
            })
          } catch (e) {
            toast.error("Category Adding Failed")
          }
          fetchPost()
    }
    const fetchPost = async () => {
        await getDocs(contactUseRef)
           .then((snapshot) => {
      const newData = snapshot.docs
      .map((doc) => ({...doc.data(), id : doc.id}))
      SetCateg(newData)         
      })
      }
      useEffect(()=>{
        fetchPost();
      }, [])
     
      const deleteMsg = async(id) => {
        const userCon = doc(Db , "Category" ,id)
        await deleteDoc(userCon)
        if(deleteDoc) {
        toast.success("Message Has Been Deleted")
        }else{
            toast.error("Could'nt Delete The Message")
        }
        fetchPost()
        }
     
 
  return (
 <>
<div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
            <h1 class="text-grey-darkest">Category List</h1>
            <div class="flex mt-4">
                <input name='Category' value={Category.Category} class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Category" onChange={(e) => SetCategory({Category : e.target.value})} required/>
                <button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-blue-400 hover:bg-teal" onClick={AddCategory}disabled={Category.Category.length ===0}>Add</button>
            </div>
        </div>
        <div>
            {Categ.map((item) => {
                return(
                    <div class="flex mb-4 items-center">
                <p class="w-full text-grey-darkest">{item.Category}</p>
                <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-red-200 hover:bg-red" onClick={()=>deleteMsg(item.id)}><i className="fa fa-trash text-red-500"></i></button>
            </div>
                )
            })}
        </div>
    </div>
</div>
 </>
  )
}

export default Categories