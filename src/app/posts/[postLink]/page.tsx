import React from 'react'
async function getPost(postLink:any) {
  const response = await fetch(process.env.HYGRAPH_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
        query: `
        query GetPost($postLink: String!) {
          blogPost(where: {postLink:$postLink}) {
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
        }
        `,
        variables: {
          postLink: postLink,
        },
      }),
    }
  );
  const data = await response.json();
  return data.data.blogPost;
}

export default async function Post({params}:any) {
  const postData=await getPost(params.postLink)
  console.log(params.postLink)
  return (
    <>
      <div>
        <p>This is post page</p>
        <h1 className=' font-bold'>{postData.postTitle}</h1>
        <p>{postData.postText.text}</p>
      </div>
    </>
  )
}

