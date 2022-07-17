import Aologin from "./Aologin";
import bgimg from "../../src/stacked-waves-haikei.svg"

const Aoloapp = () => {
  return (
    
    <div className="h-screen w-screen flex justify-center">
      <div className="h-full w-0 md:w-1/2 lg:w-1/2  flex justify-center items-center" style={{ backgroundImage: `url(${bgimg})` }}> 
      <span className='flex flex-col justify-center '>
         <h1 className='text-7xl text-white text-clip text-center font-bold '>Welcome Back!</h1>
         <span className='text-2xl text-white text-clip text-center font-bold'>Have a Nice Day</span>
      </span>
      </div>
      <div className="h-full w-1/2 sm:w-full md:w-1/2 sm:w-fu flex flex-col justify-center items-center"><Aologin/></div>
    </div>
  )
}

export default Aoloapp