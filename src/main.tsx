import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import WebFont from 'webfontloader';
import Container from './elements/Container.tsx'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import EditExpenses from './components/EditExpenses.tsx';
import CategoryExpenses from './components/CategoryExpenses.tsx';
import ExpensesList from './components/ExpensesList.tsx';
import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import { HelmetProvider } from 'react-helmet-async';
import Background from './elements/Background.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import { TotalAmountProvider } from './context/TotalMonthlyAmountContext.tsx';

WebFont.load({
  google: {
    families: ['Poppins:300,400,500,700']
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <TotalAmountProvider>
          <BrowserRouter>
            <Container>
              <Routes>
                {/* Login */}
                <Route path="/login" element={<Login />}/>
                {/* Sign Up */}
                <Route path="/sign-up" element={<SignUp />}/>

                {/* Private routes */}
                <Route element={<PrivateRoute />}>
                  {/* Expenses by ategories */}
                  <Route path="/categories" element={<CategoryExpenses />}/>
                  {/* Expenses list */}
                  <Route path="/list" element={<ExpensesList />}/>
                  {/* Default */}
                  <Route path="/" element={<App />}/>
                  {/* Expenses edit */}
                  <Route path="/edit/:id" element={<EditExpenses />}/>
                </Route>

                {/* Not found */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Container>
          </BrowserRouter>
        </TotalAmountProvider>
      </AuthProvider>
    </HelmetProvider>

    <Background />
  </StrictMode>
)
