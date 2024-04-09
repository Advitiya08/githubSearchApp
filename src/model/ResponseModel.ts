export interface SearchResponseModel{
total_count:number
incomplete_results:boolean
items?:RepoItems[]

}

export interface RepoItems{
id?:number
node_id?:string
url?:string
html_url?:string
followers_url?:string
following_url?:string
name?:string
open_issues_count?:number
topics?:string[]
forks_count?:number
owner?:RepoOwner
full_name?:string
private:boolean






}

export interface RepoOwner{
    login:string
    avatar_ur:string
    url:string
}