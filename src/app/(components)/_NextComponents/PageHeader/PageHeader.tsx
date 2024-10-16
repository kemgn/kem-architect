import styles from "./pageheader.module.css";

interface PageHeaderProps {
    pageTitle: string;
}

export default function PageHeader(props: PageHeaderProps) {
    return (
        <>
            <h1 className={styles.pageTitle}>
                {props.pageTitle}
            </h1>
        </>
    )
}
