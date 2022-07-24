import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Feed from '../pages/feed'
import { Outlet } from 'react-router-dom'
import useFetch from '../utils/hooks/useFetch'

export default function Home() {
    const [isSidebarShown, setIsSidebarShown] = useState(false)
    const [posts, setPosts] = useState([])

    function toggleSidebar() {
        setIsSidebarShown(prevState => !prevState)
    }

    useEffect(() => {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
            }
        }

        fetch('http://localhost:3000/api/posts', fetchOptions)
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])

    function handleFilter(department) {

        const fetchOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
            },
            body: {"department" : department}
        }

        fetch('http://localhost:3000/api/posts/filter/department', fetchOptions)
            .then(res => res.json())
            .then(data => setPosts(data))
    }
    
    return (
        <>
            <Sidebar className="sidebar" isSidebarShown={isSidebarShown} handleFilter={handleFilter} />
            <Header toggleSidebar={toggleSidebar} />
            <Outlet context={[posts, setPosts]}/>
        </>
    )
}