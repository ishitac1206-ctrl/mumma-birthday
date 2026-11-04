import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { chapters, hallOfFame, letter } from './data/structure';
import { Opening } from './pages/Opening';
import { Universe } from './pages/Universe';
import { ChapterLanding } from './pages/ChapterLanding';
import { ContentPage } from './pages/ContentPage';
import { HallOfFame } from './pages/HallOfFame';
import { AwardPage } from './pages/AwardPage';
import { Letter } from './pages/Letter';
import { NotFound } from './pages/NotFound';
import { MusicControl } from './components/layout/MusicControl';
import { CursorSparkle } from './components/celestial/CursorSparkle';

/** Every route begins at the top, however deep it was reached from. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Opening />} />
        <Route path="/universe" element={<Universe />} />

        {/* the six card-based chapters, each with its inner pages */}
        {chapters.map((chapter) => (
          <Route key={chapter.slug}>
            <Route path={chapter.route} element={<ChapterLanding node={chapter} />} />
            {chapter.pages.map((page) => (
              <Route
                key={page.route}
                path={page.route}
                element={<ContentPage chapter={chapter} page={page} />}
              />
            ))}
          </Route>
        ))}

        {/* chapter 06 */}
        <Route path={hallOfFame.route} element={<HallOfFame />} />
        {hallOfFame.awards.map((award) => (
          <Route key={award.slug} path={award.route} element={<AwardPage award={award} />} />
        ))}

        {/* chapter 08 */}
        <Route path={letter.route} element={<Letter />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <AnimatedRoutes />
      <MusicControl />
      <CursorSparkle />
    </BrowserRouter>
  );
}
