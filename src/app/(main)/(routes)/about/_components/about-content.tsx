import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

const AboutContent = () => {
  return (
    <div>
      <div className="bg-[#242424] min-h-screen flex flex-col items-center gap-2 border-b border-b-white">
        <div className="w-1/2 font-medium text-3xl sm:text-5xl lg:text-7xl text-white mt-8">
          Everyone has a story to tell.
        </div>
        <div className="w-1/2 font-medium text-xl text-white mt-6">
          Medium is a home for human stories and ideas. Here, anyone can share
          insightful perspectives, useful knowledge, and life wisdom with the
          world—without building a mailing list or a following first. The
          internet is noisy and chaotic; Medium is quiet yet full of insight.
          It’s simple, beautiful, collaborative, and helps you find the right
          audience for whatever you have to say.
        </div>
        <div className="w-1/2 font-medium text-xl text-white mt-6">
          We believe that what you read and write matters. Words can divide or
          empower us, inspire or discourage us. In a world where the most
          sensational and surface-level stories often win, we’re building a
          system that rewards depth, nuance, and time well spent. A space for
          thoughtful conversation more than drive-by takes, and substance over
          packaging.
        </div>
        <div className="w-1/2 font-medium text-2xl text-white mt-6 bg-stone-600 p-2">
          Ultimately, our goal is to deepen our collective understanding of the
          world through the power of writing.
        </div>
        <div className="w-1/2 font-medium text-xl text-white mt-6">
          Over 100 million people connect and share their wisdom on Medium every
          month. Many are professional writers, but just as many
          aren’t — they’re CEOs, computer scientists, U.S. presidents, amateur
          novelists, and anyone burning with a story they need to get out into
          the world. They write about what they’re working on, what’s keeping
          them up at night, what they’ve lived through, and what they’ve learned
          that the rest of us might want to know too.
        </div>
        <div className="w-1/2 font-medium text-xl text-white mt-6 mb-4">
          Instead of selling ads or selling your data, we’re supported by a
          growing community of Medium members who align with our mission. If
          you’re new here, start exploring. Dive deeper into whatever matters to
          you. Find a post that helps you learn something new, or reconsider
          something familiar—and then share your own story.
        </div>
      </div>
      <Link
        href="/"
        className="h-[150px] flex justify-between items-center bg-[#242424] text-white hover:bg-white hover:text-black transition duration-500 group"
      >
        <div className="ml-4 font-semibold text-4xl sm:text-6xl tracking-tight">Start Reading</div>
        <ArrowBigRight className="mr-6 w-10 h-10 sm:w-16 sm:h-16 fill-white group-hover:fill-black" />
      </Link>
    </div>
  );
};

export default AboutContent;
