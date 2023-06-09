import Image from 'next/image'
import Navbar from './components/Navbar';
import Link from 'next/link';
 export default async function Home() {
    const posts = await getPosts();
 

        function ArticlesContainer(){
          if(posts==null)
          {
              return(
                  <>
                    <p>Sorry, there are no articles at the moment</p>
                  </>
              )
          }
          else{
              return (
                  <div>
                  {posts?.map((post:any)=>{
                    return(
                      <>
                        <div className=' rounded-md shadow-2xl lg:m-10 p-10'>
                           <Link href={`/posts/${post.postLink}`}><p className=' font-bold'>{post.postTitle}</p></Link>
                           <p>{post.postText.text} </p>
                        </div>
                      </>                
                      );  
                    })}
                </div>
                )
          }
        }
  return(
   <>
     <ArticlesContainer/>
   </>
  );
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