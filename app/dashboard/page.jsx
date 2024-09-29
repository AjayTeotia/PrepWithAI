import AddNewInterview from "./_components/AddNewInterview";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl">Dashboard</h1>

      <h2 className="text-muted-foreground mt-2">
        Start and create your Mockup Interview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
    </div>
  );
};

export default Dashboard;
