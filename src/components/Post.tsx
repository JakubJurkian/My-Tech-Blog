export default function Post(props: {
  author: string;
  addedXAgo: string;
  title: string;
  img: string;
  text: string;
}) {
  const createMarkup = () => ({ __html: props.text });

  return (
    <div className="flex flex-col w-[98%] max-w-4xl bg-[#04031c6e] rounded-2xl shadow-lg overflow-hidden">
      <div className="flex justify-between">
        <span className="p-2 self-start text-sm xs:text-base bg-[#5c37b0] rounded-b-md">
          Author: {props.author}
        </span>
        <span className="p-2 self-start text-sm  xs:text-base bg-[#5c37b0] rounded-b-md">
          Added: {props.addedXAgo}
        </span>
      </div>
      <h1 className="text-2xl text-center smPlus:text-3xl self-center my-4 mx-3">
        {props.title}
      </h1>
      <img src={props.img} />
      <p
        className="text-lg m-4 break-words"
        dangerouslySetInnerHTML={createMarkup()}
      ></p>
    </div>
  );
}
