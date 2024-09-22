import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import AboutProfile from "./AboutProfile"
import { Link } from 'react-router-dom'
export default function MenuProfile() {
    return (
        <TabGroup>
            <TabList>
                <Tab><Link>POST</Link></Tab>
                <Tab><Link to={"about"}>Giới thiệu</Link></Tab>
                <Tab>Bạn bè</Tab>
            </TabList>
        </TabGroup>
    )
}
