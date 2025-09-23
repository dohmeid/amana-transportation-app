import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HomePage />
      <Footer />
    </main>
  );
}
