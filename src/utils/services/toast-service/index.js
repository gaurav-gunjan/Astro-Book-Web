import { toast } from "react-toastify";

export const Msg = ({ text }) => {
    return (
        <p className='text-grey'>{text}</p>
    );
};

export const toaster = (myProps, toastProps) => toast(<Msg {...myProps} />, { ...toastProps });

toaster.success = (myProps, toastProps) => toast.success(<Msg {...myProps} />, { ...toastProps, position: 'bottom-center', className: "border border-green-500" });
toaster.error = (myProps, toastProps) => toast.error(<Msg {...myProps} />, { ...toastProps, position: 'bottom-center', className: "border border-red-500" });
toaster.warning = (myProps, toastProps) => toast.warning(<Msg {...myProps} />, { ...toastProps, position: 'bottom-center', className: "border border-yellow-500" });
toaster.info = (myProps, toastProps) => toast.info(<Msg {...myProps} />, { ...toastProps, position: 'bottom-center', className: "border border-sky-500" });