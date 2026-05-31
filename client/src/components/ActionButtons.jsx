
const ActionButtons = (videoProcessor) => {
    const actions = [
        {
            id: 'compress',
            title: 'Compress',
            icon: '🗜️',
            description: 'Reduce video file size'
        },
        {
            id: 'audio',
            title: 'Audio',
            icon: '🎵',
            description: 'Convert video to mp3'
        },
        {
            id: 'thumbnail',
            title: 'Thumbnail',
            icon: '🖼️',
            description: 'Generate preview image'
        },
        {
            id: 'convert',
            title: 'Convert',
            icon: '🔄',
            description: 'Convert to other formats'
        }
    ];
    const selectedAction = actions.find(action => action.id === videoProcessor.selectedOperation);

    return (
        <div className='space-y-4'>
            <h2 className='font-semibold'>Operations</h2>
            <div className='flex gap-3 overflow-x-auto pb-2'>
                {actions.map((action) => {
                    return (
                        <button key={action.id}
                        onClick={() => videoProcessor.setSelectedOperation(action.id)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full border
                            transition-colors ${
                                videoProcessor.selectedOperation === action.id ?
                                'bg-blue-600 text-white border-blue-600' :
                                'bg-white text-slate-700 border-slate-300'
                            }`}>{action.icon} {action.title}</button>
                    )
                })}
            </div>
            {selectedAction.id === 'convert' && (
                <div className='space-y-2'>
                    <label className='block text-sm font-medium'>
                        Output Format
                    </label>
                    <select 
                    className='w-full border rounded-lg px-3 py-2'
                    value={videoProcessor.targetFormat}
                    onChange={(e) => videoProcessor.setTargetFormat(e.target.value)}>
                        <option value='mov'>MOV</option>
                        <option value='mp4'>MP4</option>
                        <option value="mkv">MKV</option>
                        <option value="webm">WEBM</option>
                    </select>
                </div>
            )}
            {selectedAction.id === 'thumbnail' && (
                <div className='space-y-2'>
                    <p className='text-sm text-slate-500'>
                        Thumbnail will be generated at: {' '}
                        {videoProcessor.thumbnailTime.toFixed(1)}s
                    </p>
                </div>
            )}
            <p className='text-sm text-slate-500'>{selectedAction?.description}</p>
            <button disabled={!videoProcessor.canProcess || videoProcessor.isProcessing}
            className="w-full bg-slate-800 text-white py-3 rounded-lg
            hover:bg-slate-900 disabled:bg-slate-400 disabled:cursor-not-allowed"
            onClick={() => {
                switch (videoProcessor.selectedOperation) {
                    case 'compress':
                        return videoProcessor.handleCompressVideo();
                    case 'audio':
                        return videoProcessor.handleExtractAudio();
                    case 'thumbnail':
                        return videoProcessor.handleGenerateThumbnail();
                    case 'convert':
                        return videoProcessor.handleConvertFormat();
                }
            }}>{videoProcessor.isProcessing ? 'Processing... ' : 'Run Operation'}</button>
        </div>
    )
}

export default ActionButtons;