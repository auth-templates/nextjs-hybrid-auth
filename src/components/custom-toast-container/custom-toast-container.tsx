import 'react-toastify/dist/ReactToastify.css';
import { cssTransition, ToastContainer, ToastContainerProps, ToastTransitionProps } from 'react-toastify';
import classes from './custom-toast-container.module.css';

const NoAnimation = cssTransition({
	enter: classes.noAnimation,
	exit: classes.noAnimation,
	collapse: false,
});

export default function CustomToastContainer(props: ToastContainerProps) {
	return (
		<div className={classes.wrapper}>
			<ToastContainer
				theme={'colored'}
				icon={false}
				transition={NoAnimation}
				autoClose={false}
				toastClassName={classes.toastClassname}
				className={classes.root}
				position="bottom-right"
				hideProgressBar={true}
				newestOnTop={true}
				closeOnClick={true}
				draggable={false}
				{...props}
			/>
		</div>
	);
}
