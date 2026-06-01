
const ProgressSection = (videoProcessor) => {
    if (!videoProcessor.isUploading && !videoProcessor.isProcessing) {
        return null;
    }

    if (videoProcessor.isUploading) {
        return (
            <div className='space-y-2'>
                <div className='flex justify-between'>
                    <span className='font-medium text-green-500'>
                        Uploading Video...
                    </span>
                    <span className='text-sm text-green-500'>
                        {videoProcessor.uploadProgress}%
                    </span>
                    </div>
                    <div className='w-full bg-slate-600 rounded-full h-5'>
                    <div className='bg-green-600 h-5 rounded-full transition-all
                    duration-300'
                    style={{width: `${videoProcessor.uploadProgress}%`}}>
                    </div>
                    
                </div>
            </div>
        )
    }

    if (videoProcessor.isProcessing) {
        return (
            <div className='space-y-2'>
                <div className='flex justify-between'>
                <span className='font-medium text-amber-500'>
                   {videoProcessor.operation}
                </span>
                
                <span className='text-sm text-amber-500'>
                    {videoProcessor.progress}%
                </span>
                </div>
                <div className='w-full bg-slate-600 rounded-full h-5'>
                <div className='bg-amber-500 h-5 rounded-full transition-all
                duration-300'
                style={{width: `${videoProcessor.progress}%`}}>
                </div>
                </div>
            </div>
        )
    }
};

export default ProgressSection;
