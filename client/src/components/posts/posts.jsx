import Post from "../post/post"
import "./posts.css"

export default function Posts({posts}) {
  if(!posts){
    return;
  }
  return (
    <div className='Posts'>
      {posts.map((p,idx)=>(
        <Post post={p} key={idx}/>
      ))}
    </div>
  )
}
