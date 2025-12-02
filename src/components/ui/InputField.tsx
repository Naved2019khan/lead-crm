/**
 * A reusable, Tailwind-styled input field component.
 * @param {string} name - The HTML 'name' attribute for the input.
 * @param {string} label - The visible label for the input.
 * @param {string} [type='text'] - The HTML input type (e.g., 'text', 'number', 'date', 'email').
 * @param {boolean} [disabled=false] - If the input should be disabled.
 * @param {function} onChange - The handler function for the input change event.
 * @param {string | number} value - The current value of the input.
 * @param {object} [props={}] - Any additional props (like min, max for number/date).
 */
const InputField = ({ 
  name, 
  label, 
  type = "text", 
  disabled = false, 
  onChange, 
  value, 
  ...props 
}) => {
  return (
    <div className="flex-1 min-w-0">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
        {...props}
      />
    </div>
  );
};

export default InputField;