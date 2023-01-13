import React, { useState,useEffect } from 'react'
import { getFirestore,collection, deleteDoc, doc, getDocs, updateDoc,addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Db} from '../Db/Db';

const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    // More products...
  ]
  
  export default function Addproduct() {
    const contactUseRef = collection(Db , "Products")
    const [props , setProps] = useState({
        Name : "",
        Image : "",
        Price : 0,
        Description : ""
    })
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setProps({...props , [name] : value})
        }

        const SaveProduct = async(e) => {
            e.preventDefault()
            try {
                const docRef = await addDoc(collection(Db, "Products"), {
                   Name : props.Name,
                   Image : props.Image,
                   Description : props.Description,
                   Price : props.Price
                    },    
               )
                const id = docRef.id
                toast.success("Item Has Been Added")
                setProps({
                    Name : "",
                    Image : "",
                    Price : 0,
                    Description : ""
                })
              } catch (e) {
                toast.error("Item Adding Failed")
              }
        }
    return (
      <div className="mt-3 m-auto"> <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1 my-auto">
              <div className="px-4 sm:px-0 ml-3">
                <h3 className="text-2xl font-medium leading-6 text-gray-900 text-center text-3xl my-3">Add Product</h3>
                <p className="mt-1 text-sm text-gray-600 text-center text-lg my-3">
                  Add New Product To Your Website. It Will Store In Database.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" >
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
                            id="company-website"
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                           onChange={handleChange}
                           value={props.Name}
                            placeholder="Example Example"
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
                            id="company-website"
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                           onChange={handleChange}
                           value={props.Price}
                            placeholder="₹"
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
                          id="about"
                          name="Description"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                         onChange={handleChange}
                         value={props.Description}
                          placeholder="Example"
                          defaultValue={''}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your Product.
                      </p>
                    </div>
  
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Photo</label>
                     <img className='w-auto h-auto' src={props.Image} />
                      
                        <input
                            type="url"
                            name="Image"
                            id="company-website"
                            className="block rounded-lg ml-3 w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                           onChange={handleChange}
                           value={props.Image}
                            placeholder="www.example.png"
                          />
                    </div>
  
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-between">
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={()=>setProps({Name:"",Image:"",Price:"",Description:""})}
                    >
                     Reset
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={SaveProduct}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  
      </div>
    )
  }
  