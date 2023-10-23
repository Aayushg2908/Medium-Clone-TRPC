import ProfileForm from "./form";

const OnboardingForm = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="font-bold text-3xl sm:text-4xl my-4">
        Complete Your Profile
      </div>
      <ProfileForm />
    </div>
  );
};

export default OnboardingForm;
