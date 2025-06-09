import classes from './layout.module.css';
import Image from 'next/image'

export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className={classes.root}>
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
            <div className={classes.wrapper}>
                { children }
            </div>
        </div>
    )
}