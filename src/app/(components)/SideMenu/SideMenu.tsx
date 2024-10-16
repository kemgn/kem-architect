// "use client"
import React from "react";
import styles from "./sidemenu.module.css";
import "@ims/component-library/dist/style.css";
import Accordion from "@/app/(components)/Accordion/Accordion"
import NavigationLink from "@/app/(components)/_NextComponents/NavigationLink/NavigationLink"
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
//
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
//
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import CurrencyLiraOutlinedIcon from "@mui/icons-material/CurrencyLiraOutlined";
//
import BorderAllOutlinedIcon from "@mui/icons-material/BorderAllOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';

function SideMenu() {

    return (
        <>
            <div className={styles.sideMenuContainer} >
                <div className={styles.sideMenuFlexContainer}>
                    <div className={`${styles.accordionContainer} flex direction-column`}>
                        <Accordion title="User Managment" id="userManagment" content={
                            <>
                                <NavigationLink href="/profiles" title="Profiles" icon={<GroupOutlinedIcon />} />
                                <NavigationLink href="/groups" title="Groups" icon={<GroupsOutlinedIcon />} />
                                <NavigationLink href="/subjects" title="Users" icon={<FaceOutlinedIcon />} />
                            </>}
                        ></Accordion>

                       

                        <Accordion title="Predefined Fields" id="predefinedFields" content={
                            <>
                                <NavigationLink href="/lists" title="Lists" icon={<BorderAllOutlinedIcon />} />
                                <NavigationLink href="/trees" title="Trees" icon={<AccountTreeOutlinedIcon />} />
                                <NavigationLink href="/valueUnits" title="Value Units" icon={<CurrencyLiraOutlinedIcon />} />
                            </>}
                        ></Accordion>
 <Accordion title="Data Visualization" id="dataVisualization" content={
                            <>
                                {/* <NavigationLink href="/reports"      title="Reports"      icon={<DriveFileRenameOutlineOutlinedIcon/>} />
                            <NavigationLink href="/dashboards"   title="Dashboards"   icon={<DashboardOutlinedIcon />} />
                            <NavigationLink href="/helpcontent"  title="Help Content" icon={<LiveHelpOutlinedIcon  />} /> */}
                                <NavigationLink href="/ide" title="IDE" icon={<CodeOutlinedIcon />} />
                            </>}
                        ></Accordion>
                        {/* <Accordion title="UI Settings" id="uiSettings" content={
                            <>
                                <NavigationLink href="/systemLayout" title="System Layout" icon={<FaceOutlinedIcon />} />
                                <NavigationLink href="/systemMessages" title="System Messages" icon={<MessageOutlinedIcon />} />
                                <NavigationLink href="/icons" title="Icons" icon={<ContrastOutlinedIcon />} />
                            </>}
                        ></Accordion> */}
                    </div>
                    <div className={styles.helpContainer}>
                        <hr className={styles.leftbarHr} />
                        <NavigationLink title="System Settings" href="/systemsettings" icon={<SettingsOutlinedIcon />} />
                        {/* <NavigationLink title="Document Template" href="/documentTemplate" icon={<InventoryRoundedIcon />} /> */}
                        <NavigationLink title="Languages" href="/languages" icon={<SettingsOutlinedIcon />} />
                        {/* <NavigationLink title="Tools" href="#" icon={<HomeRepairServiceOutlinedIcon />} /> */}
                        <NavigationLink title="Licence Info" href="#" icon={<InfoOutlinedIcon />} />
                        <NavigationLink title="About" href="#" icon={<InfoOutlinedIcon />} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideMenu;
