import React, { useState } from 'react';
import './LoginSignup.css';

import user_icon from '../assets/user (1).png';
import name_icon from '../assets/user.png';
import email_icon from '../assets/mail.png';
import pass_icon from '../assets/padlock.png';

const LoginSignup = () => {
    const [action, setAction] = useState('Login');
    const [step, setStep] = useState(1);
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('All');
    const [editIndex, setEditIndex] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = () => {
        setStep(2); // Proceed to "Your account is ready! You can now log in." message
    };

    const handleLogin = () => {
        // In a real application, you'd check the username and password against a database here
        setStep(3); // Proceed to "You are logged in!" message
    };

    const handleAddTodo = () => {
        if (todo.trim() === '') {
            setError('Please enter a to-do item.');
        } else if (editIndex !== null) {
            const newTodos = [...todos];
            newTodos[editIndex].text = todo;
            setTodos(newTodos);
            setEditIndex(null);
            setTodo('');
            setError('');
        } else {
            setTodos([...todos, { text: todo, completed: false }]);
            setTodo('');
            setError('');
        }
    };
    

    const handleDeleteTodo = (index) => {
        if (window.confirm('Are you sure you want to delete this to-do?')) {
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            setTodos(newTodos);
        }
    };

    const handleEditTodo = (index) => {
        setTodo(todos[index].text);
        setEditIndex(index);
    };

    const handleToggleComplete = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const handleForgotPassword = () => {
        // Hardcoded example (in a real app, you'd check against a database)
        const storedUsername = 'user123';
        const storedPassword = 'pass123';

        if (username === storedUsername) {
            setPassword(storedPassword);
            setShowPassword(true);
            setError(''); // Clear any previous errors
        } else {
            setError('Username not found!');
            setShowPassword(false); // Hide the password display
        }
    };

    const renderFilteredTodos = () => {
        let filteredTodos = todos;

        if (filter === 'Complete') {
            filteredTodos = todos.filter((todo) => todo.completed);
        } else if (filter === 'Not Complete') {
            filteredTodos = todos.filter((todo) => !todo.completed);
        }

        return filteredTodos.map((item, index) => (
            <div className="todo-item" key={index}>
                <div className="todo-text">
                    <input
                        type="checkbox"
                        className="todo-checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleComplete(index)}
                    />
                    {item.text}
                </div>
                <div className="todo-buttons">
                    <button
                        className="update-button"
                        onClick={() => handleEditTodo(index)}
                    >
                        Edit
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => handleDeleteTodo(index)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        ));
    };

    const renderTodoMainPage = () => (
        <div className="todo-main-page">
            <h1>My To-Do List</h1>
            <div className="todo-input-container">
                <input
                    type="text"
                    className="todo-input"
                    placeholder="What's on your mind?"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button
                    className={`add-todo-button ${todo.trim() === '' ? 'disabled' : ''}`}
                    onClick={handleAddTodo}
                    disabled={todo.trim() === ''}
                >
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="filter-buttons">
                <button
                    className={`filter-button ${filter === 'All' ? 'active' : ''}`}
                    onClick={() => setFilter('All')}
                >
                    All
                </button>
                <button
                    className={`filter-button ${filter === 'Complete' ? 'active' : ''}`}
                    onClick={() => setFilter('Complete')}
                >
                    Complete
                </button>
                <button
                    className={`filter-button ${filter === 'Not Complete' ? 'active' : ''}`}
                    onClick={() => setFilter('Not Complete')}
                >
                    Not Complete
                </button>
            </div>
            <div className="todo-list">{renderFilteredTodos()}</div>
        </div>
    );
    

    const renderForm = () => (
        <div className="inputs">
            {action === 'Sign Up' && step === 1 && (
                <>
                    <div className="input">
                        <img src={name_icon} alt="" />
                        <input type="text" placeholder="Your Name" />
                    </div>
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Your Email" />
                    </div>
                </>
            )}
            <div className="input">
                <img src={user_icon} alt="" />
                <input
                    type="text"
                    placeholder="Choose a Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="input">
                <img src={pass_icon} alt="" />
                <input
                    type="password"
                    placeholder="Choose a Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={showPassword}
                />
            </div>
            {showPassword && (
                <div className="forgotpassword">
                    Your password is: <strong>{password}</strong>
                </div>
            )}
            {action === 'Login' && step === 1 && (
                <div className="forgotpassword">
                    Forgot your password?{' '}
                    <span onClick={handleForgotPassword}>Click here</span>
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    );

    const renderButtons = () => (
        <div className="sumbitcontainer">
            {action === 'Sign Up' && step === 1 && (
                <div className="sumbit" onClick={handleSignUp}>
                    Sign Up
                </div>
            )}
            {action === 'Login' && step === 1 && (
                <div className="sumbit" onClick={handleLogin}>
                    Login
                </div>
            )}
            {step === 2 && (
                <div className="confirmation">
                    Your account is ready! You can now log in. <br />
                    <div className="sumbit" onClick={() => { setStep(1); setAction('Login'); }}>
                        Back to Login
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="confirmation">
                    Welcome back! <br />
                    <div className="sumbit" onClick={() => setStep(4)}>
                        Go to To-Do List
                    </div>
                </div>
            )}
        </div>
    );

    if (step === 4) {
        return renderTodoMainPage();
    }

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            {renderForm()}
            {renderButtons()}
            {action === 'Login' && step === 1 && (
                <div className="signupgotopage">
                    Don’t have an account?{' '}
                    <span onClick={() => setAction('Sign Up')}>Sign Up</span>
                </div>
            )}
            {action === 'Sign Up' && step === 1 && (
                <div className="logingotopage">
                    Already have an account?{' '}
                    <span onClick={() => setAction('Login')}>Login</span>
                </div>
            )}
        </div>
    );
};

export default LoginSignup;
