
const UploadSection = (videoProcessor) => {
    const isDisabled = videoProcessor.isUploading || videoProcessor.isProcessing;
    
    return (
        <div className='space-y-4'>
            <input id='video-upload' className='hidden'
            disabled={isDisabled} accept='video/*' type='file' 
            onChange={(e) => { 
                videoProcessor.reset(); 
                videoProcessor.setFile(e.target.files[0])
                e.target.value = ''}} />

            {!videoProcessor.isFileSelected && (
                <>
                    <label htmlFor="video-upload"
                    className='block w-full cursor-pointer border-2 border-dashed
                    border-slate-300 rounded-xl p-8 text-center hover:border-blue-500
                    hover:bg-slate-50 transition-colors'>
                        <div className='space-y-2'>
                            <p className='text-3xl'>📹</p>
                            <p className='font-medium'>
                                Select Video
                            </p>
                            <p className='text-sm text-slate-500'>
                                Choose a video to process
                            </p>
                        </div>
                    </label>

                    
                </>
            )}

            {videoProcessor.isFileSelected && (
                <>
                    <div className='space-y-3'>
                        <video className='w-full rounded-xl max-h-80 border border-slate-200'
                        controls src={videoProcessor.previewUrl}
                        onTimeUpdate={(e) => videoProcessor.setThumbnailTime(e.target.currentTime)} />
                    </div>

                    <div className='bg-slate-50 border border-slate-200 rounded-lg p-3'>
                        <p className='text-sm text-slate-500'>
                            Selected File
                        </p>

                        <p className='font-medium break-all'>
                            {videoProcessor.file.name}
                        </p>

                        {!isDisabled && <div className='flex gap-2 mt-2'>
                            <label htmlFor='video-upload'
                            className='text-blue-600 cursor-pointer
                            hover:text-blue-700'>
                                Change Video
                            </label>

                            <button type='button' className='text-red-600
                            hover:text-red-700'
                            onClick={() => {
                                videoProcessor.reset();
                                videoProcessor.clearFile()}}>
                                Remove
                            </button>
                            </div>
                        }
                    </div>
                    <button className='w-full bg-blue-600 text-white font-medium
                    px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-slate-400
                    transition-colors'
                    disabled={!videoProcessor.canUpload}
                    onClick={videoProcessor.handleUploadVideo}>
                        {videoProcessor.isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                </>
            )}
        </div>
    )
}

export default UploadSection;