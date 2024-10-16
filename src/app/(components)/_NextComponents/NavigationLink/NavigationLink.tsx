import React from 'react'
import styles from './navigationLink.module.css';
import Link from 'next/link';

interface propsNavigationLink {
    href: string,
    title: string,
    icon?: React.ReactNode,
}

export default function NavigationLink(props: propsNavigationLink) {
    return (
        <Link href={props.href} className={styles.link}>
            {props.icon}
            <span className={styles.title}>{props.title}</span>
        </Link>
    )
}


