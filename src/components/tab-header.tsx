export default function TabHeader(props: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 md:mb-10 px-6 pt-6 md:pt-10 md:px-10">
      <h1 className="text-2xl font-semibold md:heading-m mb-2">
        {props.title}
      </h1>
      <p className="body-m text-gray-500">{props.description}</p>
    </div>
  );
}
