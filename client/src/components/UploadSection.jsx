
const UploadSection = (videoProcessor) => {
    const isDisabled = videoProcessor.isUploading || videoProcessor.isProcessing;
    
    return (
        <div className='space-y-4'>
            <input id='video-upload' className='hidden' disabled={isDisabled} accept='video/*' type='file' 
            onChange={(e) => { videoProcessor.reset(); videoProcessor.setFile(e.target.files[0]); e.target.value = ''}} />

            {!videoProcessor.isFileSelected &&
            (
                <label htmlFor='video-upload' className='block w-full cursor-pointer border-2 border-dashed
                border-slate-500 rounded-xl p-8 text-center hover:bg-slate-800 hover:border-amber-400
                hover:scale-[1.01] transition-all duration-200'>
                    <div className='space-y-2'>
                        <p className='text-3xl md:text-4xl'>📹</p>
                        <p className='font-medium text-amber-500'>Select Video</p>
                        <p className='text-sm text-slate-400'>Please select a video</p>
                    </div>
                </label>
            )}

            {videoProcessor.isFileSelected && 
            (
                <>
                <div>
                    <video className='w-full rounded-xl max-h-56 object-contain shadow-amber-400 shadow-md border border-amber-400'
                    controls src={videoProcessor.previewUrl}
                    onTimeUpdate={(e) => videoProcessor.setThumbnailTime(e.target.currentTime)}>
                    </video>
                </div>

                <div className='border border-slate-600 rounded-lg p-3'>
                    <p className='text-base text-amber-500'>Selected Video: </p>
                    <p className='font-medium text-slate-300 break-all'>
                        {videoProcessor.file.name}
                    </p>
                    {!isDisabled && 
                    (
                        <>
                        <div className='flex gap-2 mt-2 justify-end'>
                            <label className='text-sm text-amber-400 cursor-pointer hover:text-amber-300'
                            htmlFor="video-upload">
                                Change Video
                            </label>
                            <button type='button' className='text-sm text-red-400 hover:text-red-300'
                            onClick={() => { videoProcessor.reset(); videoProcessor.clearFile(); }}>
                            Remove</button>
                        </div>
                        { !videoProcessor.isUploaded && 
                        ( <button className='w-full bg-amber-500 hover:bg-amber-600 mt-2 rounded-lg py-3 px-4 text-slate-900
                        transition-colors disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed' 
                        disabled={!videoProcessor.canUpload} onClick={videoProcessor.handleUploadVideo}>
                        {videoProcessor.isUploading ? 'Uploading Video...' : 'Upload Video'}
                        </button> )}
                        </>
                    )}
                </div>
                </>
            )}
        </div>              
    )
}

export default UploadSection;
