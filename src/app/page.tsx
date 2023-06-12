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
                      <Link href={`/posts/${post.postLink}`}>
                       <span className=' rounded-md shadow-2xl lg:m-10 p-10 block'>
                           <p className=' font-bold hover:underline'>{post.postTitle}</p>
                           <p className='hover:underline'>{post.postText.text} </p>
                        </span>
                      </Link>                       
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
            json
          }
          author {
            ... on Author {
              authorName
              authorUrl
            }
          }
          postTitle
          id
          postImage {
            id
          }
        }
      }`,
  }),
});
const json = await response.json();

return json.data.blogPosts;
  
}