import Link from 'next/link';
import styles from "./cardlink.module.css";
import { Url } from 'next/dist/shared/lib/router/router';

interface CardLinkProps {
    href?: Url;
    title?: string;
    description?: string;
    color?: string;
    replace?: boolean;
}

export function CardLink(props: CardLinkProps) {

    const calculateTitle = () => {
        if (props.title && props.title?.length >= 2) {
            return props.title[0].toUpperCase() + props.title[1];
        }
        return props.title;
    };
    // const navigate = useNavigate();
    // const navigateToModule = () => {
        // navigate('/Modules');
    // }


    return (
        <Link className={styles.cardContainer} href={props.href ?? "/"} replace={props.replace}>
            <div className={styles.colorfulPart} style={{ backgroundColor: props.color }}>
                {calculateTitle()}
            </div>
            <div className={styles.textPart}>
                <div className={styles.headerPart}>
                    {props.title}
                </div>
                <div className={styles.descriptionPart}>
                    {props.description}
                </div>
            </div>
        </Link>
    )
}
