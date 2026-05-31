
const ErrorSection = (videoProcessor) => {
    if (!videoProcessor.error) {
        return null;
    }

    return (
        <div className='bg-red-50 border border-red-300 text-red-700
        p-3 rounded-lg'>
            {videoProcessor.error}
        </div>
    )
};

export default ErrorSection;