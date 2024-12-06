import { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Slots from "./components/Slots";
import Users from "./components/Users";
import Home from "./components/Home";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <div className="w-full">
          <Dialog
            open={sidebarOpen}
            onClose={setSidebarOpen}
            className="relative z-50 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
            />

            <div className="fixed inset-0 flex">
              <DialogPanel
                transition
                className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                    <button
                      type="button"
                      onClick={() => setSidebarOpen(false)}
                      className="-m-2.5 p-2.5"
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        aria-hidden="true"
                        className="size-6 text-white"
                      />
                    </button>
                  </div>
                </TransitionChild>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      alt="Your Company"
                      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                      className="h-8 w-auto"
                    />
                
                  </div>
                  <nav className="flex flex-1 flex-col">
                  
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                     
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="size-6 shrink-0"
                                />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>

                     
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </div>
          </Dialog>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
                <h1 className="text-white uppercase ml-2">Coach Conundrum</h1>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className="text-lg hover:text-gray-400"
                          >
                            <a
                              className={classNames(
                                item.current
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className="size-6 shrink-0"
                              />
                              {item.name}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>

                  
                </ul>
              </nav>
            </div>
          </div>

          <div className="lg:pl-72">
            <div className="  border-b border-gray-200 bg-white   flex justify-between py-3 px-10">
              <h3 className="text-base font-semibold text-gray-900">
                Welcome "{selectedUser?.name}"
              </h3>
              <div className="mt-3   sm:ml-4 sm:mt-0">
                {selectedUser && (
                  <button
                    onClick={() => setSelectedUser(null)}
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            <main className="py-10">
              <div className="px-4 sm:px-6 lg:px-8">
                <Routes>
                  <Route
                    path="/"
                    element={<Home {...{ selectedUser, setSelectedUser }} />}
                  />

                  <Route
                    path="/slots"
                    element={<Slots {...{ selectedUser, setSelectedUser }} />}
                  />
                </Routes>
              </div>
            </main>
          </div>
        </div>
        {/* Sidebar */}
        {/* <div className="w-64 bg-gray-800 text-white p-5">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <nav className="mt-10">
            <ul>
              <li className="mb-4">
                <Link to="/" className="text-lg hover:text-gray-400">
                  My slots
                </Link>
              </li>

              <li className="mb-4">
                <Link to="/slots" className="text-lg hover:text-gray-400">
                  Calender
                </Link>
              </li>
            </ul>
          </nav>
        </div> */}

        {/* Main Content */}

        {/* <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              Welcome {selectedUser?.name}
            </h3>
            <div className="mt-3 flex sm:ml-4 sm:mt-0">
              {selectedUser && (
                <button
                  onClick={() => setSelectedUser(null)}
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          </div> */}

        <Users {...{ selectedUser, setSelectedUser }} />
      </div>
    </Router>
  );
};

export default App;

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
  { name: "Calendar", href: "slots", icon: CalendarIcon, current: false },
];
