import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const customId = "custom-id-yes";

toast.configure();

export default function Toaster(type,message){
   if(type == 'error'){
        toast.error(message,{
          toastId: customId
     });
    }

    else if(type == 'success'){
        toast.success(message,{
            toastId: customId
       });
    }
    else if(type == 'info'){
        toast.info(message,{
            toastId: customId
        })
    }
  }