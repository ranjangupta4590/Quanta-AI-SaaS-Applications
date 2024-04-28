import  {create} from 'zustand';

interface useProModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

export const useProModal =create<useProModalStore>((set)=>({
    isOpen:false,
    onOpen:()=> set({isOpen:true}),
    onClose:()=> set({isOpen:false}),
    
}));

interface usePricingModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

export const usePricingModal =create<usePricingModalStore>((set)=>({
    isOpen:false,
    onOpen:()=> set({isOpen:true}),
    onClose:()=> set({isOpen:false}),
    
}));