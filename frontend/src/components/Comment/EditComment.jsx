import { useUpdateCommentMutation} from "../../slices/commentsApiSlice";
import {toast} from "react-toastify";
import {useState} from "react";

const EditComment = ({commentId, existingContent, onClose, refetch}) => {
    const [updateComment, {isLoading}] = useUpdateCommentMutation();
    const [content, setContent] = useState(existingContent);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        try {
            await updateComment({ commentId, data: {content} }).unwrap();
            toast.success("Comment updated successfully!");
            refetch();
            onClose();
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        rows="4"
        className="w-full p-2 border rounded bg-gray-100 text-black"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="py-2 px-4 bg-gray-600 font-semibold text-white rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-[#bae51a] text-black rounded font-semibold hover:bg-[#d5ff3f]"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  
    )

}
export default EditComment;

