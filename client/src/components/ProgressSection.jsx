
const ProgressSection = (videoProcessor) => {
    if (!videoProcessor.isUploading && !videoProcessor.isProcessing) {
        return null;
    }

    if (videoProcessor.isUploading) {
        return (
            <div className='space-y-2'>
                <div className='flex justify-between'>
                    <span className='font-medium'>
                        Uploading Video...
                    </span>
                    <span className='text-sm text-slate-600'>
                        {videoProcessor.uploadProgress}%
                    </span>
                    </div>
                    <div className='w-full bg-slate-200 rounded-full h-3'>
                    <div className='bg-green-600 h-3 rounded-full transition-all
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
                <span className='font-medium'>
                   {videoProcessor.operation}
                </span>
                
                <span className='text-sm text-slate-600'>
                    {videoProcessor.progress}%
                </span>
                </div>
                <div className='w-full bg-slate-200 rounded-full h-3'>
                <div className='bg-blue-600 h-3 rounded-full transition-all
                duration-300'
                style={{width: `${videoProcessor.progress}%`}}>
                </div>
                </div>
            </div>
        )
    }
};

export default ProgressSection;