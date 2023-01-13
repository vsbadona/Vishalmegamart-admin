import React, { useState, useEffect } from 'react'
import { getFirestore, collection, deleteDoc, doc, getDocs, updateDoc, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Db } from '../Db/Db';

const Home = () => {
  const [title, setTitle] = useState({ Title: "" })
  const [Id, setId] = useState("")
  const [fevicon, setFevicon] = useState({ Src: "", Id: "" })
  const [Logo, setLogo] = useState({ Src: "", Id: "" })
  const [fetch, setFetch] = useState([])
  const [data, setData] = useState({
    Display: false
  })

  const fetchTitle = async () => {
    const TitleRef = collection(Db, "Title")
    await getDocs(TitleRef)
      .then((snapshot) => {
        const newData = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
        setTitle({ Title: newData[0].Title })
        setId(newData[0].id)
      })
  }

  const fetchShortcut = async () => {
    const contactUseRef = collection(Db, "Pages")
    await getDocs(contactUseRef)
      .then((snapshot) => {
        const newData = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
        setFetch(newData)
      })
  }

  const fetchFevicon = async () => {
    const feviconRef = collection(Db, "Fevicon")
    await getDocs(feviconRef)
      .then((snapshot) => {
        const newData = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
        setFevicon({ Src: newData[0].Src, Id: newData[0].id })
      })
  }
  const fetchLogo = async () => {
    const feviconRef = collection(Db, "Logo")
    await getDocs(feviconRef)
      .then((snapshot) => {
        const newData = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
        setLogo({ Src: newData[0].Src, Id: newData[0].id })
      })
  }
  useEffect(() => {
    fetchShortcut();
    fetchTitle()
    fetchFevicon()
    fetchLogo()
  }, [])

  const hide = (id, display) => {
    const Db = getFirestore(); // initialize Firestore
    const docRef = doc(Db, "Pages", id);
    if (display) {
      setData({
        Display: false

      })
    } else {
      setData({
        Display: true
      })
    }
    updateDoc(docRef, data)
      .then(docRef => {
        fetchShortcut()
      }
      )
      .catch(error => {
        toast.error("Can't Hide Page")
      })

  }
  const change = () => {
    const Db = getFirestore()
    const titleref = doc(Db, "Title", Id);
    const tit = {
      Title: title.Title
    }
    updateDoc(titleref, tit)
      .then(titleref => {
        alert("Succssfully Changed Title")
        fetchTitle()
      }
      )
      .catch(error => {
        toast.error("Can't Change Title")
      })
  }

  const Fevicon = () => {
    const Db = getFirestore()
    const id = fevicon.Id
    const feviref = doc(Db, "Fevicon", id);
    const fevi = {
      Src: fevicon.Src
    }
    updateDoc(feviref, fevi)
      .then(feviref => {
        alert("Succssfully Changed Fevicon")
        fetchFevicon()
      }
      )
      .catch(error => {
        toast.error("Can't Change Fevicon")
      })
  }
  const logo = () => {
    const Db = getFirestore()
    const id = Logo.Id
    const feviref = doc(Db, "Logo", id);
    const fevi = {
      Src: Logo.Src
    }
    updateDoc(feviref, fevi)
      .then(feviref => {
        alert("Succssfully Changed Logo")
        fetchLogo()
      }
      )
      .catch(error => {
        toast.error("Can't Change Logo")
      })
  }
  return (
    <>
      <ToastContainer />
      <aside className="w-64 mx-3" aria-label="Sidebar">
        <h1 className='text-xl font-bold text-center'>Pages</h1>
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-100">
          <ul className="space-y-2">
            {fetch.map((e) => {
              return (
                <li>
                  <div className="flex justify-between rounded-lg">
                    <span className="ml-3 text-xl font-medium text-gray-900 dark:text-gray-800 rounded-lg">{e.Page}</span>
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer rounded-lg" checked={e.Display} />
                      <div className="w-11 h-6  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 rounded-lg" onFocus={() => hide(e.id, e.Display)} onClick={() => hide(e.id, e.Display)}></div>
                    </label>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <h1 className='text-xl font-bold text-center'>Title</h1>
        <div className="overflow-y-auto p-2 rounded bg-gray-100">
          <ul >
            <li>
              <div className="flex justify-between rounded-lg">
                <label className="inline-flex relative items-center cursor-pointer ">
                  <input type="text" value={title.Title} onChange={(e) => setTitle({ Title: e.target.value })} className="text-gray-800 rounded-lg bg-white w-full" />
                </label>
                <button className='bg-blue-700 rounded-lg p-2 text-white mx-1' onClick={change}>Save</button>
              </div>
            </li>
          </ul>
        </div>
        <h1 className='text-xl font-bold text-center'>Fevicon</h1>
        <div className="overflow-y-auto p-2 rounded bg-gray-100">
          <ul >
            <li>
              <div className="flex justify-between rounded-lg">
                <img src={fevicon.Src} className='w-9 h-9 rounded-lg mx-1' alt="" />
                <label className="inline-flex relative items-center cursor-pointer ">
                  <input type="url" value={fevicon.Src} onChange={(e) => setFevicon({ Src: e.target.value, Id: fevicon.Id })} className="text-gray-800 rounded-lg bg-white w-full" />
                </label>
                <button className='bg-blue-700 rounded-lg p-2 text-white mx-1' onClick={Fevicon}>Save</button>
              </div>
            </li>
          </ul>
        </div>
        <h1 className='text-xl font-bold text-center'>Logo</h1>
        <div className="overflow-y-auto p-2 rounded bg-gray-100">
          <ul >
            <li>
              <div className="flex justify-between rounded-lg">
                <img src={Logo.Src} className='w-12 h-12 rounded-lg mx-1' alt="" />
                <label className="inline-flex relative items-center cursor-pointer ">
                  <input type="url" value={Logo.Src} onChange={(e) => setLogo({ Src: e.target.value, Id: Logo.Id })} className="text-gray-800 rounded-lg bg-white w-full" />
                </label>
                <button className='bg-blue-700 rounded-lg p-2 text-white mx-1' onClick={logo}>Save</button>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Home