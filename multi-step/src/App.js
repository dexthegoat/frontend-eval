import { useState } from 'react';
import './App.css';

const fields = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    id: 'birthday',
    name: 'birthday',
    type: 'date',
    label: 'Birthday',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password',
  },
];

export default function App() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    birthday: '',
    password: '',
  });
  const [page, setPage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const lastPage = fields.length - 1;

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [`${fields[page].name}`]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (page === lastPage) {
      alert(JSON.stringify(formValues));
      setShowSuccess(true);
    } else {
      setPage(page + 1);
    }
  };

  const onBackClick = () => {
    setPage(page - 1);
  };

  return (
    <>
      {showSuccess ? (
        <h4> Success Page</h4>
      ) : (
        <>
          {page !== 0 && (
            <button id={'back-button'} onClick={onBackClick}>{`< Back`}</button>
          )}
          <form className="App" onSubmit={handleFormSubmit}>
            <label htmlFor={fields[page].id}>{fields[page].label}</label>
            <input
              type={fields[page].type}
              name={fields[page].name}
              id={fields[page].id}
              value={formValues[fields[page].name]}
              onChange={onChange}
            />
            <button type="submit" disabled={!formValues[fields[page].name]}>
              {page === lastPage ? 'Submit' : 'Next'}
            </button>
          </form>
        </>
      )}
    </>
  );
}
