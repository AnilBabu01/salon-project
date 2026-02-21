interface ErrorResponse {
    message: string;
    statusCode?: number;
}

const errorHandler = (error: any): ErrorResponse => {
    let errorMessage = 'An unexpected error occurred';
    let statusCode;

    if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        statusCode = error.response.status;
        if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        } else if (error.response.statusText) {
            errorMessage = error.response.statusText;
        }
    } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server';
    } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
    }

    // toast.error(errorMessage, {
    //     id: errorMessage
    // }); // Display the error message using react-toastify

    return { message: errorMessage, statusCode };
};

export default errorHandler;
