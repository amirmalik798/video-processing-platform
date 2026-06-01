
const ActionButtons = (videoProcessor) => {
    const actions = [
        {
            id: 'compress',
            title: 'Compress',
            icon: '🗜️',
            description: 'Reduce Video File Size'
        },
        {
            id: 'audio',
            title: 'Audio',
            icon: '🎵',
            description: 'Convert Video to Mp3'
        },
        {
            id: 'thumbnail',
            title: 'Thumbnail',
            icon: '🖼️',
            description: 'Generate Preview Image'
        },
        {
            id: 'convert',
            title: 'Convert',
            icon: '🔄',
            description: 'Convert to Other Formats'
        }
    ];

    const selectedAction = actions.find(action => action.id === videoProcessor.selectedOperation);

    if (videoProcessor.isProcessing) {
        return null;
    }
    
    return (
        <div className='space-y-4'>
            <h2 className='font-semibold text-amber-500'>Operations</h2>
            <div className='flex gap-3 overflow-x-auto hide-scrollbar'>
                {actions.map(action => (
                    <button key={action.id} className={`px-4 py-2 rounded-full mb-2 mt-2 mx-1 transition-colors duration-200 
                    text-amber-400 ${videoProcessor.selectedOperation === action.id ? 'ring-1 ring-amber-400/80' : 
                    'bg-slate-800 hover:bg-slate-700'}`}
                    onClick={() => videoProcessor.setSelectedOperation(action.id)}>
                        <div className='flex gap-2 items-center'>
                            <span>{action.icon}</span>
                            <span>{action.title}</span>
                        </div>
                    </button>
                ))}
            </div>
            <p className='text-sm text-amber-400 text-center'>{selectedAction.description}</p>
            {selectedAction.id === 'convert' && 
            (
                <div className='space-y-2'>
                    <label className='block text-sm text-amber-500 font-semibold'>Output Format</label>
                    <select value={videoProcessor.targetFormat} onChange={(e) => videoProcessor.setTargetFormat(e.target.value)} 
                    className='w-full border border-amber-500 text-amber-400 rounded-lg px-3 py-2'>
                        <option value='mov' className='bg-slate-800'>MOV</option>
                        <option value='mp4' className='bg-slate-800'>MP4</option>
                        <option value='mkv' className='bg-slate-800'>MKV</option>
                        <option value='webm' className='bg-slate-800'>WEBM</option>
                    </select>
                </div>
            )}
            {selectedAction.id === 'thumbnail' && 
            (
                <div className='space-y-2'>
                    <p className='text-sm font-semibold text-amber-500'>
                        Thumbnail will be generated at: {videoProcessor.thumbnailTime.toFixed(1)}
                    </p>
                </div>
            )}
            <button disabled={!videoProcessor.canProcess}
            className="w-full bg-amber-500 text-slate-950 py-3 rounded-lg
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
            }}>Run Operation</button>

        </div>
    )
}

export default ActionButtons;
