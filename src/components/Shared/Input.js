import React from 'react';
import key from 'uniqid';

function InputText({
                   value, label, handleOnChange, errors, labeled,
               }) {
    return (
        <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
            {labeled && (
                <div className="px-3 py-1">
                    <span>{label}</span>
                </div>
            )}
            <div className="field w-auto">
                <input
                    className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-100 px-3 py-2 form-control`}
                    type="text"
                    name="text"
                    onChange={handleOnChange}
                    placeholder={label}
                    required
                />
            </div>
            {errors && (
                <div className="d-flex flex-column px-3 pt-2 error-message">
                    {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
                </div>
            )}
        </div>
    );
}

function InputNumber({
                       value, label, handleOnChange, errors, labeled,
                   }) {
    return (
        <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
            {labeled && (
                <div className="px-3 py-1">
                    <span>{label}</span>
                </div>
            )}
            <div className="field w-auto">
                <input
                    className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-100 px-3 py-2 form-control`}
                    type="number"
                    name="text"
                    onChange={handleOnChange}
                    placeholder={label}
                    required
                />
            </div>
            {errors && (
                <div className="d-flex flex-column px-3 pt-2 error-message">
                    {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
                </div>
            )}
        </div>
    );
}

function InputTextArea({
                       value, label, handleOnChange, errors, labeled,
                   }) {
    return (
        <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
            {labeled && (
                <div className="px-3 py-1">
                    <span>{label}</span>
                </div>
            )}
            <div className="field w-auto">
                <textarea
                    className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-100 px-3 py-2 form-control`}
                    type="text"
                    name="text"
                    rows="12"
                    onChange={handleOnChange}
                    placeholder={label}
                    required
                />
            </div>
            {errors && (
                <div className="d-flex flex-column px-3 pt-2 error-message">
                    {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
                </div>
            )}
        </div>
    );
}

function InputPhoto({
                        value, label, handleOnChange, errors, labeled,
                    }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result;
                handleOnChange(base64String);
            };
        }
    };

    return (
        <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
            {labeled && (
                <div className="px-3 py-1">
                    <span>{label}</span>
                </div>
            )}
            <div className="field w-auto">
                <input
                    className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-100 px-3 py-2 form-control`}
                    type="file"
                    name="text"
                    accept="image/*" // Only allow image files
                    onChange={handleFileChange}
                    placeholder={label}
                    required
                />
            </div>
            {errors && (
                <div className="d-flex flex-column px-3 pt-2 error-message">
                    {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
                </div>
            )}
        </div>
    );
}

function Email({
  value, label, handleOnChange, errors, labeled,
}) {
  return (
    <div className={`col-12 py-1 has-validation input-text-content w-auto ${errors && 'error'}`}>
      {labeled && (
      <div className="px-3 py-1">
        <span>{label}</span>
      </div>
      )}
      <div className="field w-auto">
        <input
          className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-100 px-3 py-2 form-control`}
          type="email"
          name="email"
          onChange={handleOnChange}
          placeholder="example@gmail.com"
          required
        />
      </div>
      {errors && (
      <div className="d-flex flex-column px-3 pt-2 error-message">
        {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
      </div>
      )}
    </div>
  );
}

function Password({
  value, label, handleOnChange, errors,
}) {
  return (
    <div className={`col-12 py-1 input-text-content w-auto has-validation ${errors && 'error'}`}>
      <div className="px-3 py-1">
        <span>{label}</span>
      </div>
      <div className="field w-auto w-auto d-flex flex-row">
        <input
          className={`${(!errors && value) ? 'is-valid' : 'is-invalid'} w-auto px-3 py-2 flex-grow-1 form-control`}
          type={'password'}
          onChange={handleOnChange}
          name="password"
          placeholder="********"
          required
        />
      </div>
      {errors && (
        <div className="d-flex flex-column px-3 pt-2 error-message">
          {errors.map(({ message }) => (<span key={key()}>{message}</span>))}
        </div>
      )}
    </div>
  );
}

function Submit({ label, classes }) {
  return (
    <div className="py-1 input-text-content w-auto">
      <input type="submit" className={`w-100 px-3 py-2 ${classes}`} value={label} />
    </div>
  );
}

export {
    InputText, Email, Password, Submit, InputTextArea, InputNumber, InputPhoto
};
