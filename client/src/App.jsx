import UploadSection from "./components/UploadSection";
import ActionButtons from "./components/ActionButtons";
import ProgressSection from "./components/ProgressSection";
import DownloadSection from "./components/DownloadSection";
import ErrorSection from "./components/ErrorSection";
import SuccessSection from "./components/SuccessSection";
import { useVideoProcessor } from "./hooks/useVideoProcessor";


function App() {
  
  const videoProcessor = useVideoProcessor();

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-gray-950'>
      <div className='max-w-2xl mx-auto px-4 py-8 space-y-6'>
        <div className='text-center space-y-2'>
          <h1 className='text-2xl md:text-3xl font-bold text-amber-400'>
            Video Processing Platform
          </h1>
          <p className='text-base md:text-xl text-slate-400'>
            Convert and process videos instantly
          </p>
        </div>

        <UploadSection {...videoProcessor } />

        <ProgressSection {...videoProcessor } />
        
        <ErrorSection {...videoProcessor } />  

        <SuccessSection {...videoProcessor} />
        
        <DownloadSection {...videoProcessor } />
      
        <ActionButtons {...videoProcessor } />
        
        <p className='text-base md:text-xl text-center text-slate-500 pt-4'>Developed by: Amir Malik</p>
      
      </div>

    </div>
  
  )
}

export default App;
