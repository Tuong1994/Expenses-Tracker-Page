import withLocale from "@/libs/withLocale";

const Loading = () => {
  return (
    <div className="w-full h-screen bg-black">
      <p>Dashboard loading...</p>
    </div>
  );
};

export default withLocale(Loading);
