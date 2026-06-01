
const SuccessSection = (videoProcessor) => {
    if (!videoProcessor.isReady && !videoProcessor.isUploaded) {
        return null;
    }

    return (
        <div className='border border-green-500 text-green-400 p-2 rounded-lg'>
            ✓ {videoProcessor.lastOperation} Successfully.
        </div>
    )
}

export default SuccessSection;
