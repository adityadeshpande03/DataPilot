import { TextField } from "@mui/material";

function FormInput({ label, type, value, onChange }) {
    return (
        <TextField
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            fullWidth
        />
    );
}

export default FormInput;