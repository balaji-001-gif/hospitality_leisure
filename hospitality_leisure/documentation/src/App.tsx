import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IndustriesSection from './components/IndustriesSection';
import ModulesSection from './components/ModulesSection';
import DoctypeShowcase from './components/DoctypeShowcase';
import WorkspaceSection from './components/WorkspaceSection';
import ReportsSection from './components/ReportsSection';
import NotificationsSection from './components/NotificationsSection';
import CodeShowcase from './components/CodeShowcase';
import SetupGuide from './components/SetupGuide';
import FileStructure from './components/FileStructure';
import DownloadSection from './components/DownloadSection';
import Footer from './components/Footer';

function HomePage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <Hero />
      <IndustriesSection />
      <ModulesSection />
      <DoctypeShowcase />
      <WorkspaceSection />
      <ReportsSection />
      <NotificationsSection />
      <CodeShowcase />
      <SetupGuide />
      <FileStructure />
      <DownloadSection />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
