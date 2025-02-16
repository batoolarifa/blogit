import { useDeleteCommentMutation} from "../../slices/commentsApiSlice";
import {toast} from "react-toastify";
import {useState} from "react";

const DeleteComment = ({commentId, onClose, refetch}) => {
    const [deleteComment, {isLoading}] = useDeleteCommentMutation();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);

       
        try {
            await deleteComment(commentId).unwrap();
            toast.success("Comment deleted successfully!");
            refetch();
            onClose();
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
        finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="flex flex-col items-center p-4 bg-gray-800 text-white rounded">
        <p>Are you sure you want to delete this comment?</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };


export default DeleteComment;

