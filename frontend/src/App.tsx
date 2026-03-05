import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminRoute from './components/layout/AdminRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ActivityPage from './pages/ActivityPage';
import NewsPage from './pages/NewsPage';
import PartnershipPage from './pages/PartnershipPage';
import CooperationPage from './pages/CooperationPage';
import RegistryPage from './pages/RegistryPage';
import ContactsPage from './pages/ContactsPage';
import PrivacyPage from './pages/PrivacyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CabinetPage from './pages/CabinetPage';
import AdminPage from './pages/AdminPage';
import AdminUserDetailPage from './pages/AdminUserDetailPage';
import SpecialistPage from './pages/SpecialistPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="app">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/federation" element={<AboutPage />} />
              <Route path="/deyatelnost" element={<ActivityPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/partnerstvo" element={<PartnershipPage />} />
              <Route path="/sotrudnichestvo" element={<CooperationPage />} />
              <Route path="/reestr" element={<RegistryPage />} />
              <Route path="/specialist/:userId" element={<SpecialistPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/cabinet" element={<CabinetPage />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/users/:userId" element={<AdminUserDetailPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
