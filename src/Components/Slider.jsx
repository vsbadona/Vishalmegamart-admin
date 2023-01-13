import React, { useState,useEffect } from 'react'
import { getFirestore,collection, deleteDoc, doc, getDocs, updateDoc,addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Db} from '../Db/Db';

const Slider = () => {
    const contactUseRef = collection(Db , "Slider")
    const [short , setShort] = useState({
        Image : ""
    })
    const [updt , setUpdate] = useState({
        Display : false,
        Image : "",
       Id: ""
    })
    const [fetch , setFetch] = useState([])

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setShort({...short , [name] : value})
    }
    const handleUpdate = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setUpdate({...updt , [name] : value})
    }
    const Saveshort = async(e) => {
        e.preventDefault()
        try {
            const docRef = await addDoc(collection(Db, "Slider"), {
               Image : short.Image
                },    
           )
            const id = docRef.id
            toast.success("Slider Has Been Added")
            setShort({
                Image : ""
            })
            fetchSlider()
          } catch (e) {
            toast.error("Slider Adding Failed")
          }
    }

    const fetchSlider = async () => {
        await getDocs(contactUseRef)
           .then((snapshot) => {
      const newData = snapshot.docs
      .map((doc) => ({...doc.data(), id : doc.id}))
      setFetch(newData)         
      })
      }
      useEffect(()=>{
        fetchSlider();
      }, [])

      const Update = (e) => {
        e.preventDefault()
        const Db = getFirestore(); // initialize Firestore
    
        const docRef = doc(Db, "Slider", updt.Id);
        
        const data = {
            Image : updt.Image,
        };
        
        updateDoc(docRef, data)
        .then(docRef => {
           toast.success("Slider Have Been Updated")
           setUpdate({
            Display : false,
            Image : "",
           })
           fetchSlider()
        }
      
        )
        .catch(error => {
         toast.error("Can't Update Slider")
        })
        
    }

    const Delete = async(id) => {
        const userCon = doc(Db , "Slider" ,id)
        await deleteDoc(userCon)
        if(deleteDoc) {
        toast.success("Slider Has Been Deleted")
        }else{
            toast.error("Could'nt Delete The Slider")
        }
        fetchSlider()
        }

  return (
   <>
   <div class="w-full max-w-xs m-auto my-auto">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
       Image
      </label>
      
                          <img className=' w-full h-full' src={short.Image} alt="" />  
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="url" placeholder="www.image.jpg" name='Image'value={short.Image} onChange={handleChange}/>
    </div>

    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2" type="button" onClick={Saveshort}>
       Add Slider
      </button>
    </div>
  </form>
</div>

{updt.Display? <div  style={{backdropFilter:" blur(80px)"}} className='flex w-screen h-screen fixed inset-0 z-40 bg-black-200 bg-opacity-92 backdrop-blur-lg '>
<div class="w-4/5 h-11/12 m-auto mt-auto">
    <h1 className='float-right text-xl hover:text-red-500 mr-6 mt-2' onClick={() => setUpdate({Display:false})}><i className="fa fa-close"></i></h1>
  <form class="bg-white w-full h-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4 ">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
       Image
      </label>
      <img class="w-auto h-auto rounded" src={updt.Image} alt="Medium avatar"></img>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="url" placeholder="www.image.jpg" name='Image'value={updt.Image} onChange={handleUpdate}/>

    </div>
    <div class="flex items-center justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2" type="button" onClick={Update}>
        Update Slider
      </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={()=>{Delete(updt.Id);setUpdate({Display:false})}}>
        Delete Slider
      </button>
    </div>
  </form>
</div>
</div>
: ""}

<div className="container mw-100 scrollbar-hide">
                <div className="bg-slate-50 flex justify-center  w-screen flex-wrap">
                           {fetch.map((item) => {
                            return(
                                <>
                                 <div className="item mx-5 my-3" onClick={() => setUpdate({Display:true,Image:item.Image,Id:item.id})} >
                                <img src={item.Image} alt="" className='img-thumbnail my-2 w-screen h-full'/>
                            </div>
                                </>
                            )
                           })}
                </div>
            </div>
   </>
  )
}

export default Slider
