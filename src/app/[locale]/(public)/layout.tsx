import classes from './layout.module.css';

export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className={classes.root}>
            { children }
        </div>
    )
}