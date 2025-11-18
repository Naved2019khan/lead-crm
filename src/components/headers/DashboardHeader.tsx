"use client"
import { Bell, Menu, Moon, Search, Sun, User, LogOut, Settings, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Dropdown } from '../ui/Dropdown';
import { SearchableDropdown } from '../ui/DropdownInput';
import ProfileDropdown from '../dropdown/ProfileDropdown';

export default function DashboardHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const [selected, setSelected] = useState<string>('');

  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
  ];
 

  return (
       <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>

         <div className='ml-auto flex items-center'>

          <ProfileDropdown />

            <button className=" text-gray-500 hover:text-gray-700 ">
              <Bell className="w-6 h-6" />
            </button>
         </div>
          </div>
        </header>
  );
}