import bgPhoto from '/bg-photo.webp';

export default function BackgroundImg() {
  return (
    <img
      src={bgPhoto}
      alt="background photo"
      className="max-h-96 w-full blur-sm border-b-2 border-gray-600"
    />
  );
}
