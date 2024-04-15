import { toast } from "react-toastify";

export const handleErr = (err) => {
    const resMessage = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    console.log('resmessage', resMessage);
    return resMessage;
};

export const showSuccessMsg = (msg) => {
    toast.success(msg, { autoClose: 2000 });
};

export const showErrMsg = (msg) => {
    if(msg != 'canceled')
        toast.error(msg, { autoClose: 2000 });
};

export const getRupeeIconWithPrice = (text, w = 18, h = 18) => {
    return (
        <>
            {getCurSvg(w, h)}
            <span>{text}</span>
        </>
    );
};

export const getCurSvg = (w = 20, h = 20) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            width={w}
            height={h}
        >
            <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z" />
        </svg>
    );
};