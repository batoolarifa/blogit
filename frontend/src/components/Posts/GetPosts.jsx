import Loader from "../Loader";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";
import Button from "../Button"

function GetPosts({posts, isLoading, visiblePosts, setVisiblePosts, buttonStyle , buttonClass}) {
if (isLoading) {
   return <Loader/>
}

return (
  <div className="px-2 py-2">
      <h1 className="mt-5 mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ml-20"> My <mark className="px-2 text-black bg-[#bae51a] rounded-sm ">Blogs</mark> </h1>

    <div className="container mx-auto">
      <div className="w-full lg:w-8/12 mx-auto">
        <div className="mt-6">
        {posts.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">No blogs posted yet</p>
            ) : (
              posts.slice(0, visiblePosts).map((post) => (
                <div
                  key={post._id}
                  className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md mb-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-light text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <NavLink
                      to={`/blog/${post._id}`}
                      className="text-2xl font-bold text-gray-700 hover:underline"
                    >
                      {post.title}
                    </NavLink>

                    <div
                      className="prose lg:prose-xl"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content.substring(0, 200)) + "...",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <NavLink
                      to={`/blog/${post._id}`}
                      className="bg-[#bae51a] text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-[#020202] hover:text-white transition-all duration-200 ease-in-out"
                    >
                      Read more
                    </NavLink>
                    <div>
                      <div className="flex items-center">
                        <img
                          src={post.blogAuthor.profilePicture}
                          alt="profile"
                          className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                        />
                        <h1 className="font-bold text-gray-700 hover:underline">
                          {post.blogAuthor.fullName}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        {visiblePosts < posts.length && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setVisiblePosts((prev) => prev + 3)}
              bgColor={buttonStyle?.bgColor}
              textColor={buttonStyle?.textColor}
              className={`px-6 py-3  rounded-lg shadow-md transition-all duration-200 ease-in-out ${buttonClass}`}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  </div>
);

}
export default GetPosts;
