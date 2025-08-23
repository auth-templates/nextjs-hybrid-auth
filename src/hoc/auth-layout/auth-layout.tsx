import classes from './auth-layout.module.css';

export default function AuthLayout({
	title,
	subtitle,
	children,
}: {
	title: string;
	subtitle: string;
	children: React.ReactNode;
}) {
	return (
		<div className={classes.layout}>
			<section className={classes.top}>
				<div className={classes.left}>
					<h1 className={classes.title}>{title}</h1>
					<p className={classes.subtitle}>{subtitle}</p>
				</div>
				<div className={classes.right}>{children}</div>
				<div className={classes.wave}>
					<svg viewBox="0 0 1440 320" preserveAspectRatio="none">
						<path d="M0,160 C720,320 720,0 1440,160 L1440,320 L0,320 Z" fill="var(--color-footer)" />
					</svg>
				</div>
			</section>
		</div>
	);
}
