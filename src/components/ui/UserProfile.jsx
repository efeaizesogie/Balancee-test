import React from "react";

const UserProfile = () => {
  return (
    <div className="py-2 my-8 gap-2 flex justify-start flex-col items-center">
      <div className="bg-primary-100 border flex h-[50px] items-center justify-center rounded-full w-[50px]">
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocI5y9iaXomumZQKaBAKCqMJvXW-HlEpZ2iemG6y4uclJ8uEp3I=s96-c"
          alt="E"
          className="object-fill"
        />
      </div>
      <div
        className="text-center max-w-[80%] md:max-w-[100%] break-words
      "
      >
        <p className="capitalize font-semibold pb-1.5 text-neutral-900">
          Efeosa Aizesogie{" "}
        </p>
        <div className="font-semibold text-sm text-neutral-600 hover:text-neutral-700">
          <a href="/profile">
            <p>View Profile</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
