import React from "react";

const UserProfile = () => {
  return (
    <div class="py-2 my-8 flex justify-start lg:flex-col lg:items-center">
      <div class="bg-primary-100 border flex h-[50px] items-center justify-center lg:mb-3 mr-3 rounded-full w-[50px]">
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocI5y9iaXomumZQKaBAKCqMJvXW-HlEpZ2iemG6y4uclJ8uEp3I=s96-c"
          alt="E"
          class="object-fill"
        />
      </div>
      <div
        class="lg:text-center max-w-[50%] md:max-w-[100%] break-words
      "
      >
        <p class="capitalize font-semibold pb-1.5 text-neutral-900">
          Efeosa Aizesogie{" "}
        </p>
        <div class="font-semibold text-sm text-neutral-600 hover:text-neutral-700">
          <a href="/profile">
            <p>View Profile</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
