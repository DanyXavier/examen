import { useMemo, useState } from 'react';
import modcss from './modal.module.css';
type Props = {
    isOpen: boolean,
    onClose: () => void,
    children: JSX.Element[] | JSX.Element
}
export default function Modal(props: Props) {
    //const open = useMemo(()=>props.isOpen,[props.isOpen]);

    if (!props.isOpen) return null;
    return (

        <div className={modcss.modalContenido + ' ' + modcss.modalOpen} onClick={(e) => {
            if (e.target === e.currentTarget) {
                props.onClose()
            }
        }}>
            <div className={modcss.modalBody}>
                {props.children}
            </div>
        </div>

    );
} 