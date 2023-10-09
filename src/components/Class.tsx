type Props = {
  portal: string;
  description: string;
  image: string;
};

const Class = ({ portal, description, image }: Props) => {
  //   const overlayStyles = ``;

  return (
    <div className="relative mx-5 inline-block h-[200px] w-[250px]">
      <div className="absolute bg-gray-700 w-full h-20 bottom-0 rounded-b-lg">
        <p className="text-white">{portal}</p>
        <p className="absolute w-full h-8 bottom-0 text-white">{description}</p>
      </div>
      <img src={image} alt="" className="w-[250px] h-[200px] rounded-lg" />
    </div>
  );
};

export default Class;
