import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowPathIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon
  
} from '@heroicons/react/24/outline'

const solutions = [
  {
    name: 'Home',
    description: 'See All Activities From Users.',
    href: '/',
    icon: ChartBarIcon,
  },
  {
    name: 'Products',
    description: 'See All Added Products.',
    href: 'Product',
    icon: LifebuoyIcon,
  },
  {
    name: 'Add Product',
    description: 'Add New Product On Your Website.',
    href: 'Addproduct',
    icon: CursorArrowRaysIcon,
  },
  { name: 'Categories', description: "Add & Remove Categories Of Home Page .", href: 'Category', icon: PlayIcon },
  {
    name: 'Contacts Recieved',
    description: "Check Out Recieved Contact Messages.",
    href: 'Contact',
    icon: PhoneIcon,
  },
  {
    name: 'Shortcuts',
    description: "Add , Update Or Delete Shortcuts.",
    href: 'Shortcut',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Slider',
    description: "Add , Update Or Delete Slider.",
    href: 'Slider',
    icon: ArrowPathIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [open,setOpen]=useState(false)
  return (
  <>
  <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://vishalmegamartadmin.netlify.app/" className="flex items-center">
                <img src="https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo-768x432.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            </a>
            <div className="flex items-center lg:order-2">
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false" onClick={()=>setOpen(!open)}>
                  <i className="fa fa-bars"></i>
        
                </button>
            </div>
            <div className={`${open ? "flex" : "hidden"} justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2`}>
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
               {solutions.map((page)=>{
                return(
                  <li key={Math.random()}>
                  <Link to={page.href} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                  <page.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                    {page.name}</Link>
              </li>
                )
               })}
                </ul>
            </div>
        </div>
    </nav>
</header>
  </>

            )
}



