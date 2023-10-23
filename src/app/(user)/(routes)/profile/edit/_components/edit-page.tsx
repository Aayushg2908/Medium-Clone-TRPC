import EditForm from "./edit-form";

const EditMainContent = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="font-bold text-2xl sm:text-4xl mt-4">
        Edit Your Profile
      </div>
      <EditForm />
    </div>
  );
};

export default EditMainContent;
