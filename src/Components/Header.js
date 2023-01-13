import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
  
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

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
    icon: ChartBarIcon,
  },
  {
    name: 'Add Product',
    description: 'Add New Product On Your Website.',
    href: 'Addproduct',
    icon: CursorArrowRaysIcon,
  },
  { name: 'Categories', description: "Add & Remove Categories Of Home Page .", href: 'Category', icon: ShieldCheckIcon },
  {
    name: 'Contacts Recieved',
    description: "Check Out Recieved Contact Messages.",
    href: 'Contact',
    icon: Squares2X2Icon,
  },
  {
    name: 'Shortcuts',
    description: "Add , Update Or Delete Shortcuts.",
    href: 'Shortcut',
    icon: Squares2X2Icon,
  },
  {
    name: 'Slider',
    description: "Add , Update Or Delete Slider.",
    href: 'Slider',
    icon: Squares2X2Icon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  return (
    <Popover className="bg-white">
      <div className="  mx-auto max-w-8xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo-768x432.png"
                alt=""
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-auto'
                    )}
                  >
                    <span>Pages</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {solutions.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                            >
                              <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                   
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

          </Popover.Group>
          </div>
          </div>
          </Popover>
            )
}