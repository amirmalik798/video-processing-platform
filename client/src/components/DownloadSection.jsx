
const DownloadSection = (videoProcessor) => {
    if (!videoProcessor.isReady) {
        return null;
    }
    
    return (
        <>
            <a href={videoProcessor.downloadUrl}
            target="_blank" rel="noreferrer"
            className='block w-full text-center bg-green-600 text-white font-medium
            py-3 rounded-lg hover:bg-green-700 transition-colors'>Download Result</a>
        </>
    )
};

export default DownloadSection;