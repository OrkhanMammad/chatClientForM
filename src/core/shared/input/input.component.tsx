import { IInputProps } from './input';
import { useInputStyles } from './input.style';

const InputComponent = ({ name, type, label, placeholder, value, onChange, onBlur, error }: IInputProps) => {
  const {input,formItem,inpLabel} = useInputStyles();

  return (
    <div className={formItem}>
      {label && (
        <label className={inpLabel} htmlFor={name}>
          {label}
        </label>
      )}
      <input
      className={input}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value} 
        onChange={onChange}
        onBlur={onBlur}
      />
                {error && <span style={{ color: 'red',width:'70%' }}>{error}</span>}

    </div>
  );
};

export default InputComponent;
