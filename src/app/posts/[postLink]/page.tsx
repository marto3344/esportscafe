import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";
async function getPost(postLink: any) {
  const response = await fetch(process.env.HYGRAPH_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetPost($postLink: String!) {
          blogPost(where: {postLink:$postLink}){
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
              url
            }
          }
        }
        `,
      variables: {
        postLink: postLink,
      },
    }),
  });
  const data = await response.json();
  return data.data.blogPost;
}

export default async function Post({ params }: any) {
  const postData = await getPost(params.postLink);
  console.log(`${postData.postImage?.url}`);
  return (
    <>
     <div className=" text-center">
      <div className=" inline-block ">
          <h1 className=" font-bold text-5xl text-left">
            {postData.postTitle}
          </h1>
          {postData.postImage && (
            <div style={{width:"50rem",height:"30rem"}} className=" relative my-10">
              <Image src={`${postData.postImage.url}`} fill={true} alt={""} />
            </div>
          )}

          {postData.postText && <div className=" text-left text-lg"><RichText content={postData.postText.json} /></div>}
        </div>
     </div>
      
    </>
  );
}
