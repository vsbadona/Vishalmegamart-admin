import React, { useState,useEffect } from 'react'
import { getFirestore,collection, deleteDoc, doc, getDocs, updateDoc,addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Db} from '../Db/Db';

const Shortcut = () => {
    const contactUseRef = collection(Db , "Shortcuts")
    const [short , setShort] = useState({
        Title : "",
        Image : ""
    })
    const [updt , setUpdate] = useState({
        Display : false,
        Image : "",
        Title : "",
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
            const docRef = await addDoc(collection(Db, "Shortcuts"), {
               Title : short.Title,
               Image : short.Image
                },    
           )
            const id = docRef.id
            toast.success("Shortcut Has Been Added")
            setShort({
                Title : "",
                Image : ""
            })
            fetchShortcut()
          } catch (e) {
            toast.error("Shortcut Adding Failed")
          }
    }

    const fetchShortcut = async () => {
        await getDocs(contactUseRef)
           .then((snapshot) => {
      const newData = snapshot.docs
      .map((doc) => ({...doc.data(), id : doc.id}))
      setFetch(newData)         
      })
      }
      useEffect(()=>{
        fetchShortcut();
      }, [])

      const Update = (e) => {
        e.preventDefault()
        const Db = getFirestore(); // initialize Firestore
    
        const docRef = doc(Db, "Shortcuts", updt.Id);
        
        const data = {
           Title : updt.Title,
            Image : updt.Image,
        };
        
        updateDoc(docRef, data)
        .then(docRef => {
           toast.success("Shortcut Have Been Updated")
           setUpdate({
            Display : false,
            Image : "",
           Title : ""
           })
           fetchShortcut()
        }
      
        )
        .catch(error => {
         toast.error("Can't Update Shortcut")
        })
        
    }

    const Delete = async(id) => {
        const userCon = doc(Db , "Shortcuts" ,id)
        await deleteDoc(userCon)
        if(deleteDoc) {
        toast.success("Shortcut Has Been Deleted")
        }else{
            toast.error("Could'nt Delete The Shortcut")
        }
        fetchShortcut()
        }

  return (
   <>
   <div class="w-full max-w-xs m-auto my-auto">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
       Image
      </label>
                          <img className='h-full h-full rounded mx-auto' src={short.Image} alt="" />
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="url" placeholder="www.image.jpg" name='Image'value={short.Image} onChange={handleChange}/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
       Title
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" name='Title' placeholder="Example" value={short.Title} onChange={handleChange}/>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2" type="button" onClick={Saveshort}>
       Add Shortcut
      </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2" type="button" onClick={()=>setShort({Title:"",Image:""})}>
       Reset
      </button>
    </div>
  </form>
</div>

{updt.Display? <div  style={{backdropFilter:" blur(80px)"}} className='flex w-screen h-screen fixed inset-0 z-40 bg-black-200 bg-opacity-92 backdrop-blur-lg '>
<div class="w-full max-w-xs m-auto mt-auto">
    <h1 className='float-right text-xl hover:text-red-500 mr-6 mt-2' onClick={() => setUpdate({Display:false})}><i className="fa fa-close"></i></h1>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4 ">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
       Image
      </label>
      <img class="w-full h-full rounded" src={updt.Image} alt="Medium avatar"></img>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="url" placeholder="www.image.jpg" name='Image'value={updt.Image} onChange={handleUpdate}/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
       Title
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" name='Title' placeholder="Example" value={updt.Title} onChange={handleUpdate}/>
    </div>
    <div class="flex items-center justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2" type="button" onClick={Update}>
        Update Shortcut
      </button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={()=>{Delete(updt.Id);setUpdate({Display:false})}}>
        Delete Shortcut
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
                                 <div className="item mx-5 my-3" onClick={() => setUpdate({Display:true,Image:item.Image,Title:item.Title,Id:item.id})} >
                                <img src={item.Image} alt="" className='img-thumbnail my-2 w-24 h-24'/>
                                <p className='text-center'>{item.Title}</p>
                            </div>
                                </>
                            )
                           })}
                </div>
            </div>
   </>
  )
}

export default Shortcut
