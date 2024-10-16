import React from 'react';
import styles from './header.module.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Image from 'next/image';
import Link from 'next/link';
import HeaderAvatar from '@/app/(components)/_IMSComponentLibary/adapters/Avatar';
import { AutoComplete } from '@/app/(components)/_IMSComponentLibary/components';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { ThemeModeSwitcher } from '../ThemeModeSwitcher/ThemeModeSwitcher';
import NavigationLink from '../_NextComponents/NavigationLink/NavigationLink';
import ApiRoundedIcon from '@mui/icons-material/ApiRounded';

export default function Header() {
    return (
        <>
            <div className={`${styles.container} flex align-items-center justify-content-space-between`}>
                <div className={`${styles.iconLogoGroup} flex justify-content-center align-items-center`}>
                    <MenuRoundedIcon className={`${styles.headerIcon}`} fontSize='large' />
                    <div className="flex align-items-center p1">
                        <Link href={"/"} className="flex align-items-center">
                            <Image
                                alt="IMS Logo"
                                src="/logo.png"
                                width={38}
                                height={38}
                                className="mx2"
                            />
                            <Image
                                alt="IMS Logo"
                                src="/ims-text.svg"
                                width={92}
                                height={25}
                            />
                        </Link>
                    </div>
                </div>

                <div className={`${styles.linksSearchAvatarGroup} flex justify-content-center align-items-center`}>
                    <Link                         className='px1-and-half' href="/">Workspaces</Link>
                    <Link                         className='px1-and-half' href="/modules">Modules</Link>
                    {/* <NavigationLink               href="/apiendpoints"     title="API Endpoints" icon={<ApiRoundedIcon/>} />  */}
                    {/* <AutoComplete                 className='px1-and-half' name="searchInput"    placeholder='Search or jump to' size='small'/> */}
                    <ThemeModeSwitcher/>
                    <HelpOutlineRoundedIcon       className={`${styles.headerIcon} mx1-and-half`} fontSize='medium'/>
                    <NotificationsNoneRoundedIcon className={`${styles.headerIcon} mx1-and-half`} fontSize='medium'/>
                    <HeaderAvatar                 className='ml1' />
                </div>
            </div>
        </>
    )
}




/*
system settings
property
view ->
   basic settings
   view properties
   forms
consditional formaters 
 */

/*
interpol string blok
collection expression? block
api blockları
------------
moaco da renkleniyo text render engin de boyanmıyo @ varsa kuralalr işlesin  -> çağrıya araştırma 
*/