import React, { useState, useEffect } from 'react'
import { getFirestore, collection, deleteDoc, doc, getDocs, updateDoc, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Db } from '../Db/Db';

const Contact = () => {
    const contactUseRef = collection(Db, "Contact")
    const [Category, SetCategory] = useState({ Category: "" })
    const [Categ, SetCateg] = useState([])
    const fetchPost = async () => {
        await getDocs(contactUseRef)
            .then((snapshot) => {
                const newData = snapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                SetCateg(newData)
            })
    }
    useEffect(() => {
        fetchPost();
    }, [])

    const deleteMsg = async (id) => {
        const userCon = doc(Db, "Contact", id)
        await deleteDoc(userCon)
        if (deleteDoc) {
            toast.success("Message Has Been Deleted")
        } else {
            toast.error("Could'nt Delete The Message")
        }
        fetchPost()
    }
    return (
        <div class={`overflow-x-auto relative shadow-md sm:rounded-lg `}>
            <table class="w-full text-sm text-left text-gray-600 dark:text-gray-600">
                <thead class="text-xs text-gray-600 uppercase bg-whitedark:bg-white dark:text-gray-600">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input
                                    id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-white rounded border-white focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white" />
                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Name
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Email
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Message
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {Categ.map((item) => {
                        return (
                            <tr class="bg-white border-b dark:bg-white dark:border-white hover:bg-whitedark:hover:bg-white">
                                <td class="p-4 w-4">
                                    <div class="flex items-center">
                                        <input
                                            id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-white rounded border-white focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-white focus:ring-2 dark:bg-white dark:border-white" />
                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" class="flex items-center py-4 px-6 text-gray-600 whitespace-nowrap dark:text-gray-600">
                                    <div class="pl-3">
                                        <div class="text-base font-semibold">{item.Name}</div>
                                        <div class="font-normal text-gray-600">
                                            {/* add mail here */}
                                        </div>
                                    </div>
                                </th>
                                <td class="py-4 px-6">
                                    {item.Email}
                                </td>
                                <td class="py-4 px-6">
                                    <div class="flex items-center">
                                        {item.Message}
                                    </div>
                                </td>
                                <td class="py-4 px-6">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><i className="fa fa-trash text-red-500 text-lg" onClick={() => deleteMsg(item.id)}></i></a>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            {Categ.length === 0 ? <h1 className='text-5xl text-center my-12 py-3'>No Messages Found</h1> : <h1>.</h1>}
        </div>
    )
}

export default Contact