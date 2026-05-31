
const SuccessSection = (videoProcessor) => {
    if (!videoProcessor.isReady) {
        return null;
    }

    return (
        <div className='bg-green-50 border border-green-300 text-green-700 p-4
        rounded-lg'>
            ✓ {videoProcessor.lastOperation} Successfully.
        </div>
    )
}

export default SuccessSection;