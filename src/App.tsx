import useAlert from "./hooks/useAlert";

const alertButtons = [
  { type: "success", label: "success", message: "This is success" },
  { type: "info", label: "info", message: "This is info" },
  { type: "warning", label: "warning", message: "This is warning" },
  { type: "error", label: "error", message: "This is error" },
  { type: "dark", label: "dark", message: "This is dark" },
];

function App() {
  const alert = useAlert();

  const showAlert = (type: string, message: string) => {
    if (type === "success") alert.success(message);
    if (type === "info") alert.info(message);
    if (type === "warning") alert.warning(message);
    if (type === "error") alert.error(message);
    if (type === "dark") alert.dark(message);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-center text-2xl">React Custom Alert</h1>

      <div className="flex gap-5 items-center justify-center">
        <div className="flex gap-5 items-center justify-center">
          {alertButtons.map((alertType, index) => (
            <button
              key={`${alertType.type}-${index}`}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none rounded w-28 px-4 py-2"
              onClick={() => showAlert(alertType.type, alertType.message)}
            >
              {alertType.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
