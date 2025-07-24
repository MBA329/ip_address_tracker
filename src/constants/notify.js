import {toast} from "sonner";

export function notify(message,type){
    if (type === "success") toast.success(message)
    else if (type === "error") toast.error(message)
}