const InputField = ({ label, type = "text", placeholder }: { label: string; type?: string; placeholder: string }) => {
    return (
      <div className="mb-4">
        <label className="block text-item font-bold text-black mb-2">{label}</label>
        <input
          type={type}
          className="w-full p-3 border-2 border-point-green rounded-lg bg-white text-content focus:ring-2 focus:ring-green-400"
          placeholder={placeholder}
        />
      </div>
    );
  };
  
  export default InputField;
  