export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  options,
  placeholder,
  autoComplete
}) {
  const status = touched ? (error ? 'invalid' : 'valid') : '';

  return (
    <div className={`form-group ${status}`}>
      <label htmlFor={name}>{label}</label>
      {options ? (
        <select id={name} name={name} value={value} onChange={onChange} onBlur={onBlur}>
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      )}
      <small className="field-msg">{touched ? error || 'Looks good' : ''}</small>
    </div>
  );
}
