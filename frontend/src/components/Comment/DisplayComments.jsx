import { useGetAllCommentsQuery } from "../../slices/commentsApiSlice";
import Loader from "../Loader";
import { HiOutlineDotsHorizontal, HiPencil, HiTrash } from "react-icons/hi";
import {useState} from "react"
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import AddComment from "./AddComment";



const DisplayComments = ({blogId, currentUser}) => {
    const { data: comments, isLoading, error, refetch } = useGetAllCommentsQuery(blogId);
    
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [deletingCommentId, setDeletingCommentId] = useState(null);


  

    
    const toggleDropdown = (commentId) => {
        setOpenDropdownId(openDropdownId === commentId ? null : commentId);
    };

    if (isLoading) return <Loader/>;
    if (error) return <p>Error fetching comments</p>;

    return (
        <div>
            <AddComment blogId={blogId} refetch={refetch} />
    
        <section className=" py-8 /lg:py-16 antialiased">
  <div className="max-w-2xl mx-auto px-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold  text-white">Comments</h2>
        
    </div>
         

        <div>
         <div>
            {comments?.data?.map((comment) => (
                <article key={comment._id} className="p-6 text-base bg-[1b1b1b] rounded-lg">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-white">
                                <img
                                    className="mr-2 w-12 h-12 rounded-full"
                                    src={comment.commentedByUser?.profilePicture || ""}
                                    alt={comment.commentedByUser || "User"}
                                />
                                {comment.commentedByUser?.fullName || "Anonymous"}
                            </p>
                            <p className="text-sm text-gray-400 ">
                                <time dateTime={comment.createdAt}>
                                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}

                                </time>
                            </p>
                        </div>
                 {comment.commentedByUser._id === currentUser._id && (
    <div className="relative">
        <button
            onClick={() => toggleDropdown(comment._id)} 
            className="inline-flex items-center p-2 text-sm font-medium text-gray-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-800 bg-[#1b1b1b]"
            type="button"
        >
            <HiOutlineDotsHorizontal className="w-5 h-5" />
            <span className="sr-only">Comment settings</span>
        </button>

        {/* Dropdown Menu */}
        {openDropdownId === comment._id && (
            <div className="absolute right-0 left-4 mt-2 w-36 rounded shadow bg-gray-700">
                <ul className="py-1 text-sm text-gray-200">
                    <li>
                        <button
                            onClick={() => setEditingCommentId(comment._id)}
                            className="flex items-center gap-2 py-2 px-4 hover:bg-gray-600 hover:text-white"
                        >
                            <HiPencil className="w-4 h-4" />
                            Edit
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setDeletingCommentId(comment._id)}
                            className="flex items-center gap-2 py-2 px-4 hover:bg-gray-600 hover:text-white"
                        >
                            <HiTrash className="w-4 h-4 text-red-500" />
                            Delete
                        </button>
                    </li>
                </ul>
            </div>
        )}
    </div>
)}

            </footer>

           { editingCommentId === comment._id ? (
               <EditComment 
                 commentId={comment._id}
                 existingContent={comment.content}
                 onClose={() => setEditingCommentId(null)}
                 refetch={refetch}
               />
           ) :
           deletingCommentId === comment._id ? (
            <DeleteComment
              commentId={comment._id}
              onClose={() => setDeletingCommentId(null)} // Close the delete prompt
              refetch={refetch}
            />
          ) : (
            <p className="text-gray-50">{comment.content}</p>
          )}

                </article>
            ))}
        </div>
        </div>

        </div>
      </section>
      </div>
    
     );
};

export default DisplayComments;

