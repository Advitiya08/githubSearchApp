import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { UseSearchHook } from "./hooks/search";
import { RepoItems, SearchResponseModel } from "./model/ResponseModel";
import  Item  from "./components/Item";

function App() {
  const [value, setValue] = useState<string>("");
  const onChangeValue = (event: any) => {
   // console.log(event)
    setValue(event.target.value)

  }
  const loaderObserverRef = useRef(null);
  useEffect(() => {
    
  }, [])
  const [pageIndex, setPageIndex] = useState(0)
  const { data, isLoading, error, getSearchResult,appendSearchResult} = UseSearchHook(pageIndex, 25, value)
  
  
  useEffect(() => {
   
    if(pageIndex!==0 && data?.items?.length<data?.total_count)
    appendSearchResult()
    

  }, [pageIndex])

  useEffect(()=>{
    const intersectionObserver = new IntersectionObserver((enteries) => {
      enteries.forEach((entry) => {
        console.log(enteries)
        if (entry.isIntersecting){
          console.log("last Page reached")
        setPageIndex((previousPageIndex) => {
          return previousPageIndex + 1;
        })
      }
      })
    }, { threshold: 0.1 })
    if (loaderObserverRef.current) {
      intersectionObserver.observe(loaderObserverRef.current)

    }
    return ()=>{
      if (loaderObserverRef.current) {
        intersectionObserver.unobserve(loaderObserverRef.current)
  
      }
    }
  },[data])
  return (

    <div>
      <div className="input">
        <Input className="w-[40vw] mt-20 ml-20 border-black" placeholder="Search" value={value} onChange={(event) => { onChangeValue(event) }}></Input>
      </div>
      <div className="ml-20  mt-5 border-black ">
        <Button className="pl-100 border-black bg-gray-300 relative left-12" id="search" onClick={() => {
          setPageIndex(0);
          getSearchResult();
        }} >
          Search
        </Button>
      { isLoading && !error.flag ?  <div>isLoading...</div> : null}
        {error.flag ? <div>error.msg</div> : null
        }
        {!isLoading && !error.flag ? <ul >
          <li>
            {
              data?.items.map((x: RepoItems,index:number) => {
               
                return <Item key={data?.Item?.id} repoItem={x}   > </Item>

              })
              
            }
          </li>
          <div ref={loaderObserverRef} style={{ height: "1px" }}></div>
           
        </ul >
          : null}</div>
        
      </div>
    
  )
}

export default App
