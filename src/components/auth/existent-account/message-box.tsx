import classes from './message-box.module.css';

const MessageTypes = {
    error: classes.error,
    info: classes.info,
    warning: classes.warning
}

type MessageBoxProps = {
    data: {
        theme: string, 
        lines: string[]
    },
    ariaLive?: string
}

export default function MessageBox({data = {theme: 'info', lines: [] }, ariaLive = "assertive", ...rest}: MessageBoxProps) {
    return (
        <ul 
            {...rest}
            role="alert"
            aria-live={ariaLive ?? "assertive"}
            className={(MessageTypes as any)[data.theme]}>
            {
                data.lines.map((line, index) => <li key={index} tabIndex={0}>{line}</li>)
            }
        </ul>
    );
}