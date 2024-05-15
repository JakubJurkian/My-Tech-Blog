function AuthorCard(props: {
  author: string;
  description: string;
  src: string;
  githubLink: string;
}) {
  return (
    <div className="bg-gray-900 flex flex-col p-3 mx-2 rounded-xl shadow-md max-w-lg mobile:flex-row relative bottom-16 smallMobile:bottom-20 mobile:bottom-28 medium:bottom-36 mobile:p-4 small:m-auto medium:px-6 tablet:w-4/5 desktop:max-w-xl">
      <img
        src={props.src}
        alt="author"
        width="148"
        className="self-center shadow-md rounded-lg my-2 mobile:mr-6 small:w-40 desktop:w-44"
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
        <p className="largeDesktop:text-lg">{props.description}</p>
      </div>
    </div>
  );
}

export default AuthorCard;
