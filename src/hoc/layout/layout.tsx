import classes from './layout.module.css';
import Images from '../../assets/images/dandelion.svg';
import Image from 'next/image'

type LayoutProps = {
    title: string,
    children: React.ReactNode
}

export default function Layout({children, title}: LayoutProps) {
    return (
        <div className={classes.wrapper}>
            <div className={classes.logo}>
                <Image
                    src="assets/images/dandelion.svg"
                    alt="Company Logo"
                    className={classes.image}
                    width={100}
                    height={ 250}
                    priority
                />
            </div>
            <h1 className={classes.title}>{title}</h1>
            <div className={classes.wrapper2}>
                { children }
            </div>
        </div>
    )
}
