import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { resolveConflict, clearConflictData } from "../taskSlice";
import { useToast } from "@/contexts/ToastContext";
import {
  getTaskDiff,
  formatConflictMessage,
  formatFieldName,
  formatFieldValue,
} from "@/utils/conflictUtils";
import { AlertTriangle, Check, GitMerge, RefreshCw } from "lucide-react";

const ConflictResolutionModal = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { conflictData, saving } = useSelector((state) => state.tasks);
  const { taskId, serverVersion, localChanges, isOpen } = conflictData;

  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const diff = getTaskDiff(serverVersion, localChanges);
  const conflictMessage = formatConflictMessage(serverVersion);

  const handleResolve = async (strategy) => {
    setSelectedStrategy(strategy);

    try {
      await dispatch(
        resolveConflict({
          taskId,
          resolutionType: strategy,
          taskData: localChanges,
        })
      ).unwrap();

      toast.success(`Conflict resolved via ${strategy}`);
      dispatch(clearConflictData());
    } catch (error) {
      toast.error(error || "Failed to resolve conflict");
    }
  };

  const handleDiscard = () => {
    dispatch(clearConflictData());
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={() => dispatch(clearConflictData())}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <AlertTriangle className="text-yellow-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Conflict Detected
          </h2>
        </div>
        <p className="text-sm text-gray-600">{conflictMessage}</p>
      </div>

      {/* Diff Display */}
      <div className="mb-6 max-h-96 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Changes Comparison
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Server Version */}
          <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
            <h4 className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1">
              <RefreshCw size={14} />
              Server Version
            </h4>
            <div className="space-y-2">
              {Object.entries(diff.changed).map(([key, value]) => (
                <div key={key} className="text-xs">
                  <span className="font-medium text-gray-700">
                    {formatFieldName(key)}:
                  </span>
                  <p className="text-gray-900 mt-0.5 p-2 bg-white rounded border border-blue-200 break-words">
                    {formatFieldValue(key, value.server)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Your Version */}
          <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
            <h4 className="text-xs font-semibold text-green-900 mb-2 flex items-center gap-1">
              <Check size={14} />
              Your Changes
            </h4>
            <div className="space-y-2">
              {Object.entries(diff.changed).map(([key, value]) => (
                <div key={key} className="text-xs">
                  <span className="font-medium text-gray-700">
                    {formatFieldName(key)}:
                  </span>
                  <p className="text-gray-900 mt-0.5 p-2 bg-white rounded border border-green-200 break-words">
                    {formatFieldValue(key, value.local)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resolution Options */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">
          Choose Resolution Strategy:
        </h3>

        {/* Overwrite */}
        <button
          onClick={() => handleResolve("overwrite")}
          disabled={saving}
          className="w-full flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="p-2 bg-blue-100 rounded-lg shrink-0">
            <Check size={20} className="text-blue-600" />
          </div>
          <div className="text-left flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">
              Use My Version (Overwrite)
            </h4>
            <p className="text-xs text-gray-600">
              Replace server version completely with your changes. All server
              changes will be discarded.
            </p>
          </div>
        </button>

        {/* Merge */}
        <button
          onClick={() => handleResolve("merge")}
          disabled={saving}
          className="w-full flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="p-2 bg-green-100 rounded-lg shrink-0">
            <GitMerge size={20} className="text-green-600" />
          </div>
          <div className="text-left flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">Merge Changes</h4>
            <p className="text-xs text-gray-600">
              Keep server version as base and apply your changes on top.
              Recommended for partial updates.
            </p>
          </div>
        </button>

        {/* Discard */}
        <button
          onClick={handleDiscard}
          disabled={saving}
          className="w-full flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="p-2 bg-red-100 rounded-lg shrink-0">
            <RefreshCw size={20} className="text-red-600" />
          </div>
          <div className="text-left flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">
              Discard My Changes
            </h4>
            <p className="text-xs text-gray-600">
              Reload the page and discard all your changes. Server version will
              be kept.
            </p>
          </div>
        </button>
      </div>

      {/* Loading State */}
      {saving && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Resolving conflict...
        </div>
      )}
    </Modal>
  );
};

export default ConflictResolutionModal;
