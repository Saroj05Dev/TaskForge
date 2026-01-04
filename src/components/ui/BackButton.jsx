import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium ${className}`}
    >
      <ArrowLeft size={18} />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
};

export default BackButton;
