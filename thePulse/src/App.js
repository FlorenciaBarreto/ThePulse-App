import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/DynamicHeader';
import Home from './components/Home/Home';
import Pricing from './components/Pricing/Pricing';
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
import LogIn from './components/Login-SignUp/Login';
import SignUp from './components/Login-SignUp/SignUp';
import Pin from './components/Login-SignUp/Pin';
import Name from './components/Login-SignUp/Name';
import Welcome from './components/Login-SignUp/WelcomePin';
import Choose from './components/Admin-/Choose';
import Dashboard from './components/Admin-/Dashboard';
import WhiteSpace from './components/Whitespace';
import { SurveyProvider } from './assets/js/SurveyContext';
import { TemplateProvider } from './assets/js/TemplateContext';
import Survey from './components/Survey';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const handleAuthChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };

        // Añade un event listener para el evento personalizado
        window.addEventListener('authChange', handleAuthChange);

        return () => {
            // Asegúrate de limpiar el event listener cuando el componente se desmonte
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    return ( <
        Router >
        <
        SurveyProvider >
        <
        TemplateProvider >
        <
        div className = "App" >
        <
        Header / >
        <
        WhiteSpace size = "small" / >
        <
        Routes >
        <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/pricing"
        element = { < Pricing / > }
        /> <
        Route path = "/about-us"
        element = { < AboutUs / > }
        /> <
        Route path = "/contact-us"
        element = { < ContactUs / > }
        /> <
        Route path = "/login"
        element = { < LogIn / > }
        /> <
        Route path = "/sign-up"
        element = { < SignUp / > }
        /> <
        Route path = "/pin"
        element = { < Pin / > }
        /> <
        Route path = "/name"
        element = { isAuthenticated ? < Name / > : < Navigate to = "/pin"
            replace / > }
        /> <
        Route path = "/welcome"
        element = { isAuthenticated ? < Welcome / > : < Navigate to = "/pin"
            replace / > }
        />   <
        Route path = "/:pin"
        element = { < Survey / > }
        /> <
        Route path = "/choose"
        element = { isAuthenticated ? < Choose / > : < Navigate to = "/login"
            replace / > }
        /> { /* Actualización para proteger la ruta /dashboard */ } <
        Route path = "/dashboard"
        element = { isAuthenticated ? < Dashboard / > : < Navigate to = "/login"
            replace / > }
        /> <
        /Routes> <
        WhiteSpace size = "medium" / >
        <
        /div> <
        /TemplateProvider> <
        /SurveyProvider> <
        /Router>
    );
}
export default App;