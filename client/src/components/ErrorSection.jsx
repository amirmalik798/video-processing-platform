
const ErrorSection = (videoProcessor) => {
    if (!videoProcessor.error) {
        return null;
    }

    return (
        <div className='border border-red-500 text-red-400 p-2 rounded-lg'>
            {videoProcessor.error}
        </div>
    )
};

export default ErrorSection;
