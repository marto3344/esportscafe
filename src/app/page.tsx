import Image from 'next/image'
import Navbar from './components/Navbar';
 export default async function Home({data}:any) {
  const posts = await getPosts();
  console.log(posts)
      return (
        <>
         
            <div>
            {posts?.map((post:any)=>{
              return(
              
              <h1>{post.postTitle}</h1>
                );  
              })}
          </div>
        </>
      
      )
}
async function getPosts() {
  const response = await fetch(process.env.HYGRAPH_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query:`
    query{
      blogPosts {
        postLink
        postText {
          text
          raw
          markdown
          html
        }
        author {
          ... on Author {
            authorName
            authorUrl
          }
       
        }
           postTitle
          id
      }
    }`,
  }),
});
const json = await response.json();

return json.data.blogPosts;
  
}