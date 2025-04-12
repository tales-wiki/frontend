interface LoadingOverlayProps {
  message: string;
}

const LoadingOverlay = ({ message }: LoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-slate-900/20 flex items-center justify-center z-50">
      <div className="bg-slate-700 p-8 rounded-xl shadow-2xl flex flex-col items-center backdrop-blur-md border border-slate-600/50">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-300 border-t-transparent mb-6"></div>
        <p className="text-slate-200 font-medium text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
