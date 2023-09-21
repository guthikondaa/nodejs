import 'izitoast/dist/css/iziToast.min.css'
import iZtoast from 'izitoast'

const toast = {
    error: (message, title = 'Error:') => {
        return iZtoast.error({
            title: title,
            message: message,
            position: 'topRight',
			backgroundColor: '#FF2626',
            messageColor: '#F7F6F2',
            titleColor: "#F7F6F2",
            iconColor: "#F7F6F2",
            theme: "dark"
        });
    },
    success: (message, title = 'Success:') => {
        return iZtoast.success({
            title: title,
            message: message,
            position: 'topRight',
			backgroundColor: '#4AA96C',
            messageColor: "#F7F6F2",
            titleColor: "#F7F6F2",
            iconColor: "#F7F6F2",
            theme: "dark"
        });
    }
};

export default toast;
