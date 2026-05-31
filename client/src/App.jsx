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
    <>
    <div className='min-h-screen bg-slate-100 flex justify-center items-start py-8'>
      
      <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl space-y-6'>
        <div className='text-center space-y-2'>
        <h1 className='text-2xl font-bold text-center'>
          Video Processing Platform
        </h1>
        <p className='text-slate-500'>
          Compress, convert and process videos instantly
        </p>
        </div>

        <UploadSection {...videoProcessor } />

        <ActionButtons {...videoProcessor } />

        <ErrorSection {...videoProcessor } />  

        <SuccessSection {...videoProcessor} />
        
        <ProgressSection {...videoProcessor } />

        <DownloadSection {...videoProcessor } />
      
        <p className='text-m text-center'>Developed by: Amir Malik</p>
      
      </div>

    </div>
    </>
  )
}

export default App
