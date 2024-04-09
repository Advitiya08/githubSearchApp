import { FC, useEffect, useState } from "react"
import axios from "axios";
import { RepoItems, SearchResponseModel } from "@/model/ResponseModel";

interface Error{
   msg?:string
   flag?:boolean  
}
export const UseSearchHook:Function =(pageIndex:number,pageSize:number,searchParams:string)=>{
   const [data,setData]=useState<SearchResponseModel>()
     const [isLoading,setIsLoading]=useState(false)
    
      const [error,setError]=useState(()=>{
            let error1:Error={
               msg:"",
               flag:false
            }
            return error1
      }) 
      const getSearchResult=()=>{
         setIsLoading(true)
         console.log("..........................."+searchParams)
         if(pageIndex!=0){
            pageIndex=0;
         }
         if(!pageSize)
            pageSize=25;
         const baseUrl="https://api.github.com/search/repositories?q="
         if(searchParams.trim().length>0){
         let url=baseUrl+searchParams+"&page="+pageIndex.toString()+"&per_page="+pageSize.toString();
            axios.get<SearchResponseModel>(url).then((res)=>{
               console.log(res.data);
               setData(res.data)
               setIsLoading(false)
               let error2={
                  msg:"",
                  flag:false
               }
               setError(error2)
      }).catch((err)=>{
         console.log(err)
         let error2={
            msg:err.message,
            flag:true
         }
         setError(error2)

      })
   }
   }
   const appendSearchResult=()=>{
  //    setIsLoading(true)
      console.log("..........................."+searchParams)
      if(!pageIndex){
         pageIndex=0;
      }
      if(!pageSize)
         pageSize=25;
      const baseUrl="https://api.github.com/search/repositories?q="
      console.log("...........prev size",data?.items?.length)
      if(searchParams.trim().length>0){
      let url=baseUrl+searchParams+"&page="+pageIndex.toString()+"&per_page="+pageSize.toString();
         axios.get<SearchResponseModel>(url).then((res)=>{
            console.log(res.data);
               let oldItems:RepoItems[]=[];
               if(data?.items)
                  oldItems=data.items
               let newItems:RepoItems[]=[];
               if(res.data?.items)
                newItems=res.data?.items
              
               newItems=[...oldItems,...newItems];
               res.data.items=[...newItems];
               setData(res.data)
            // setIsLoading(false)
            let error2={
               msg:"",
               flag:false
            }
            setError(error2)
            console.log("new size ......",res.data?.items?.length)
            console.log(newItems)
   }).catch((err)=>{
      console.log(err)
      let error2={
         msg:err.message,
         flag:true
      }
      setError(error2)

   })
}
}
  
     
    
    return {data,isLoading,error,getSearchResult,appendSearchResult};
    
}