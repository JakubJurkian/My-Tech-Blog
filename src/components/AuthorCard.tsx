function AuthorCard(props: {
  author: string;
  description: string;
  src: string;
  githubLink: string;
}) {
  return (
    <div className="bg-gray-900 flex flex-col p-3 mx-2 rounded-xl shadow-md max-w-lg relative bottom-16 xs:bottom-20 sm:flex-row sm:bottom-28 md:bottom-36 sm:p-4 smPlus:m-auto md:px-6 lg:w-4/5 2xl:max-w-xl">
      <img
        src={props.src}
        alt="author"
        width="148"
        className="self-center shadow-md rounded-lg my-2 sm:mr-6 smPlus:w-40 2xl:w-44"
      />
      <div className="text-center">
        <h2 className="text-2xl">{props.author}</h2>
        <a
          target="_blank"
          href={props.githubLink}
          className="text-blue-500 font-medium text-xs my-4"
        >
          <p className="inline-block text-sm hover:underline">GITHUB</p>
          <br />
          <img
            src="./github-logo.svg"
            alt="github logo"
            width="24"
            className="inline-block mb-2"
          />
        </a>
        <p className="3xl:text-lg">{props.description}</p>
      </div>
    </div>
  );
}

export default AuthorCard;
