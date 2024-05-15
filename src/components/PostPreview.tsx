import { Link } from 'react-router-dom';

function PostPreview(props: {
  title: string;
  description: string;
  date: string;
  img: string;
  link: string;
}) {
  return (
    <li>
     <Link to={`/posts/${props.link}`}>
      <div className="flex flex-col gap-5 p-6 bg-[#141b2b] hover:bg-[#171f32] smooth-transition-effect border-[1px] border-[#1c2f41] rounded-xl shadow-lg">
        <header className="flex justify-between">
          <h2 className='text-xl'>{props.title}</h2>
          <small className='self-center'>{props.date}</small>
        </header>
        <img src={props.img} alt={props.title} />
        <p>{props.description}</p>
      </div>
     </Link>
    </li>
  );
}

export default PostPreview;
