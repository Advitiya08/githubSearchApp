import React, { FC, useEffect, forwardRef } from "react";
import { RepoItems } from "@/model/ResponseModel";

interface ItemProps {
  repoItem?: RepoItems;
}
const areEqual = (prevProps:ItemProps, nextProps:ItemProps) => {
    return prevProps.repoItem?.id === nextProps?.repoItem?.id; // Customize as needed
  }
// Wrap the component with `forwardRef`
const Item = forwardRef<HTMLDivElement, ItemProps>(({ repoItem }, ref) => {
  useEffect(() => {
    // console.log('debug To check Performance Prop or state changed, causing a re-render:', repoItem?.full_name);
   // console.log(ref)
  }, [repoItem]); // Dependency array to monitor prop changes
  
  return (
    <div ref={ref} className="m-20"> {/* Attach the ref to the div */}
      <h1>{repoItem?.full_name}</h1>
      <a className="text-blue-500 hover:text-blue-700 underline" href={repoItem?.html_url} target="_blank" rel="noopener noreferrer">
        {repoItem?.html_url}
      </a>
      <p>Open Issues: {repoItem?.open_issues_count?.toString()}</p>
      <p>topics: {repoItem?.topics?.toString().replace("[","").replace("]","")}</p>
    </div>
  );
});

// Use React.memo for performance optimization
export default React.memo(Item);
