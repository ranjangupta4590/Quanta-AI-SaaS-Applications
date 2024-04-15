 import { auth } from "@clerk/nextjs";
 
 import prismaDB from "./prismaDB";
 
 const MAX_FREE_LIMIT =10; // Maximum number of free accounts allowed per email address.
 
 export const incrementApiLimit  = async () => {
    const {userId} =auth();
    
    if( !userId )return;
    
    const userApiLimit =await prismaDB.userApiLimit.findUnique({where:{userId}});
    
    if( userApiLimit ){
        await prismaDB.userApiLimit.update({
            where: {userId},
            data:{count:userApiLimit.count+1},
        })
    }
    else{
        await prismaDB.userApiLimit.create({data:{userId, count:1}})
    }
 };
 
 export const checkApiLimit =async ()=>{
  const  {userId}=auth() ;
  
  if(!userId)throw new Error("Unauthorized");
  
  const apiLimit=await prismaDB.userApiLimit.findUnique({where:{userId}});
  
  if(!apiLimit || apiLimit.count<MAX_FREE_LIMIT){
      return true;//If there is no record in the database, it means that this is a new user and he can create accounts
  }
  else{
    return false;
  }
 };
 
 
 export const getApiLimitCount =async()=>{
    const  {userId}= auth();
    
    if( !userId ) throw new Error('User not authenticated');
    
    const limit=await prismaDB.userApiLimit.findUnique({where:{userId}});
    
    if(!limit)return 0;
    
    return limit.count;
    
 }
 
 export default MAX_FREE_LIMIT;