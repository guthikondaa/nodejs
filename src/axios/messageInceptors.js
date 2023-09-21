import Toast from "../components/common/Toast";

const showToast = ({ title, description, type, display }) => {
	if (display && display.toUpperCase() === "TOAST") {
		if (description && description !== "") {
			Toast.show(description, {
				title,
				type: type.toLowerCase()
			});
		}
	}
};

export default function (instance) {
	instance.interceptors.response.use(
		(response) => {
			if (response.message) {
				showToast(response.message);
			}
			return Promise.resolve(response);
		},
		(error) => {
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				showToast(error.response.data.message);
			}
			return Promise.reject(error);
		}
	);
}