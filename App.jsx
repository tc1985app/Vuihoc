```react
import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// --- CURRICULUM & DATA CONFIGURATION ---
const CURRICULUM_VI = [
  { id: 'alphabet', title: 'Bảng Chữ Cái & Ngữ Âm', desc: 'Alphabet & Phonics', icon: '🔤', type: 'alphabet' },
  { id: 'blending', title: 'Tập Đánh Vần', desc: 'Phonetic Blending', icon: '🧩', type: 'blending' },
  { id: 'sentences', title: 'Thử Thách Đọc & Hiểu Câu', desc: 'Sentence & Reading Challenge', icon: '📖', type: 'sentences' },
  { id: 'vocab1', title: 'Văn hóa & Động vật', desc: 'Culture & Animals', icon: '🪷', type: 'vocab', levels: {
    beginner: [{word: 'Chó', emoji: '🐶', meaning: 'Dog'}, {word: 'Mèo', emoji: '🐱', meaning: 'Cat'}],
    intermediate: [{word: 'Con chó', emoji: '🐕', meaning: 'The dog'}, {word: 'Con mèo', emoji: '🐈', meaning: 'The cat'}],
    advanced: [{word: 'Di sản văn hóa', emoji: '🏛️', meaning: 'Cultural heritage'}, {word: 'Truyền thống', emoji: '🏮', meaning: 'Tradition'}]
  }},
  { id: 'vocab2', title: 'Ẩm thực & Đời sống', desc: 'Food & Daily Life', icon: '🍜', type: 'vocab', levels: {
    beginner: [{word: 'Phở', emoji: '🍲', meaning: 'Pho soup'}, {word: 'Cơm', emoji: '🍚', meaning: 'Rice'}],
    intermediate: [{word: 'Bánh mì', emoji: '🥖', meaning: 'Vietnamese baguette'}, {word: 'Cà phê', emoji: '☕', meaning: 'Coffee'}],
    advanced: [{word: 'Ẩm thực ba miền', emoji: '🥢', meaning: 'Regional gastronomy'}]
  }}
];

const CURRICULUM_ES = [
  { id: 'alphabet', title: 'El Alfabeto y Fonética', desc: 'Alphabet & Phonics', icon: '🔤', type: 'alphabet' },
  { id: 'blending', title: 'Fonética y Sílabas', desc: 'Syllable Blending', icon: '🧩', type: 'blending' },
  { id: 'sentences', title: 'Desafíos de Lectura y Oraciones', desc: 'Sentence & Reading Challenge', icon: '📖', type: 'sentences' },
  { id: 'vocab1', title: 'Cultura y Animales', desc: 'Culture & Animals', icon: '🪷', type: 'vocab', levels: {
    beginner: [{word: 'Perro', emoji: '🐶', meaning: 'Dog'}, {word: 'Gato', emoji: '🐱', meaning: 'Cat'}],
    intermediate: [{word: 'El perro', emoji: '🐕', meaning: 'The dog'}, {word: 'El gato', emoji: '🐈', meaning: 'The cat'}],
    advanced: [{word: 'Patrimonio', emoji: '🏛️', meaning: 'Heritage'}, {word: 'Tradición', emoji: '🏮', meaning: 'Tradition'}]
  }},
  { id: 'vocab2', title: 'Gastronomía y Vida', desc: 'Food & Daily Life', icon: '🍜', type: 'vocab', levels: {
    beginner: [{word: 'Sopa', emoji: '🍲', meaning: 'Soup'}, {word: 'Arroz', emoji: '🍚', meaning: 'Rice'}],
    intermediate: [{word: 'Pan', emoji: '🥖', meaning: 'Bread'}, {word: 'Café', emoji: '☕', meaning: 'Coffee'}],
    advanced: [{word: 'Gastronomía regional', emoji: '🥢', meaning: 'Regional cuisine'}]
  }}
];

const ALPHABET_VI = [
  {char: 'A', emoji: '🍎'}, {char: 'Ă', emoji: '🌙'}, {char: 'Â', emoji: '🥞'}, {char: 'B', emoji: '🎈'},
  {char: 'C', emoji: '🐱'}, {char: 'D', emoji: '🎒'}, {char: 'Đ', emoji: '🚂'}, {char: 'E', emoji: '🐘'},
  {char: 'Ê', emoji: '🛏️'}, {char: 'G', emoji: '🐓'}, {char: 'H', emoji: '🏠'}, {char: 'I', emoji: '📌'},
  {char: 'K', emoji: '🪁'}, {char: 'L', emoji: '🦁'}, {char: 'M', emoji: '🐵'}, {char: 'N', emoji: '🍌'},
  {char: 'O', emoji: '⭕'}, {char: 'Ô', emoji: '☂️'}, {char: 'Ơ', emoji: '🦋'}, {char: 'P', emoji: '🎹'},
  {char: 'Q', emoji: '👑'}, {char: 'R', emoji: '🤖'}, {char: 'S', emoji: '⭐'}, {char: 'T', emoji: '🐢'},
  {char: 'U', emoji: '🍇'}, {char: 'Ư', emoji: '🦘'}, {char: 'V', emoji: '🎻'}, {char: 'X', emoji: '🚲'}, {char: 'Y', emoji: '⛵'}
];

const ALPHABET_ES = [
  {char: 'A', emoji: '🍎'}, {char: 'B', emoji: '🎈'}, {char: 'C', emoji: '🐱'}, {char: 'Ch', emoji: '🍫'},
  {char: 'D', emoji: '🎒'}, {char: 'E', emoji: '🐘'}, {char: 'F', emoji: '🔥'}, {char: 'G', emoji: '🐓'},
  {char: 'H', emoji: '🏠'}, {char: 'I', emoji: '📌'}, {char: 'J', emoji: '🦒'}, {char: 'K', emoji: '🪁'},
  {char: 'L', emoji: '🦁'}, {char: 'Ll', emoji: '🦙'}, {char: 'M', emoji: '🐵'}, {char: 'N', emoji: '🍌'},
  {char: 'Ñ', emoji: '🪅'}, {char: 'O', emoji: '⭕'}, {char: 'P', emoji: '🎹'}, {char: 'Q', emoji: '👑'},
  {char: 'R', emoji: '🤖'}, {char: 'Rr', emoji: '🚂'}, {char: 'S', emoji: '⭐'}, {char: 'T', emoji: '🐢'},
  {char: 'U', emoji: '🍇'}, {char: 'V', emoji: '🎻'}, {char: 'W', emoji: '🧇'}, {char: 'X', emoji: '🎄'},
  {char: 'Y', emoji: '⛵'}, {char: 'Z', emoji: '🦊'}
];

const SONGS_VI = [
  {title: 'Một Con Vịt', id: 'oIStM-HF_kc'},
  {title: 'Cháu Yêu Bà', id: 'qjIh_3IXuYg'},
  {title: 'Kìa Con Bướm Vàng', id: 'UL4lDzpz6yk'}
];

const SONGS_ES = [
  {title: 'El Pollito Pio', id: 'qrO4YZeyl0I'},
  {title: 'La Vaca Lola', id: '36Zl7wH9gUQ'},
  {title: 'Estrellita Dónde Estás', id: '5Sj1K9V9M8Q'}
];

export default function App() {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('vuihoc_modern_profiles');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'An', emoji: '🐯', level: 'advanced', stars: 24, progress: {} },
      { id: '2', name: 'Sofia', emoji: '🌸', level: 'beginner', stars: 12, progress: {} }
    ];
  });
  
  const [currentProfile, setCurrentProfile] = useState(null);
  const [lang, setLang] = useState('vi'); // 'vi' or 'es'
  const [screen, setScreen] = useState('profiles'); // 'profiles', 'dashboard', 'lesson', 'test', 'sentences', 'music'
  const [activeLesson, setActiveLesson] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formName, setFormName] = useState('');
  const [formEmoji, setFormEmoji] = useState('👦');
  const [formLevel, setFormLevel] = useState('intermediate');

  useEffect(() => {
    localStorage.setItem('vuihoc_modern_profiles', JSON.stringify(profiles));
  }, [profiles]);

  const speakText = (text, customLang) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = customLang || (lang === 'es' ? 'es-ES' : 'vi-VN');
      window.speechSynthesis.speak(utterance);
    }
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const handleSaveProfile = () => {
    if (!formName.trim()) return;
    if (editingIndex === -1) {
      setProfiles([...profiles, { id: Date.now().toString(), name: formName, emoji: formEmoji, level: formLevel, stars: 0, progress: {} }]);
    } else {
      const updated = [...profiles];
      updated[editingIndex] = { ...updated[editingIndex], name: formName, emoji: formEmoji, level: formLevel };
      setProfiles(updated);
      if (currentProfile && currentProfile.id === updated[editingIndex].id) {
        setCurrentProfile(updated[editingIndex]);
      }
    }
    setShowProfileModal(false);
  };

  const handleResetProgress = (profileId) => {
    if (confirm(lang === 'es' ? '¿Reiniciar puntaje y progreso?' : 'Đặt lại điểm và tiến trình?')) {
      const updated = profiles.map(p => p.id === profileId ? { ...p, stars: 0, progress: {} } : p);
      setProfiles(updated);
      if (currentProfile && currentProfile.id === profileId) {
        setCurrentProfile(updated.find(p => p.id === profileId));
      }
    }
  };

  const isAdultMode = currentProfile?.level === 'advanced';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-zinc-950 text-zinc-100' : isAdultMode ? 'bg-zinc-900 text-zinc-100 font-serif' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-zinc-900'} font-sans antialiased selection:bg-amber-400 selection:text-amber-950 px-3 sm:px-6`}>
      
      {/* Top Navbar */}
      <nav className={`w-full py-4 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 border-b ${darkMode || isAdultMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/70 border-amber-100'}`}>
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => setScreen(currentProfile ? 'dashboard' : 'profiles')}>
          <span className="text-2xl sm:text-3xl animate-pulse">🪷</span>
          <div>
            <h1 className="font-black text-base sm:text-xl tracking-tight bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">Vui Học Bilingual</h1>
            <p className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tiếng Việt & Español</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`flex rounded-full p-1 border ${darkMode || isAdultMode ? 'bg-zinc-800 border-zinc-700' : 'bg-amber-100/60 border-amber-200'}`}>
            <button onClick={() => setLang('vi')} className={`px-3 sm:px-4 py-1.5 rounded-full font-black text-xs transition-all ${lang === 'vi' ? 'bg-amber-600 text-white shadow-md' : 'text-zinc-500'}`}>🇻🇳 VI</button>
            <button onClick={() => setLang('es')} className={`px-3 sm:px-4 py-1.5 rounded-full font-black text-xs transition-all ${lang === 'es' ? 'bg-amber-600 text-white shadow-md' : 'text-zinc-500'}`}>🇪🇸 ES</button>
          </div>

          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 sm:p-2.5 rounded-2xl border transition-all ${darkMode || isAdultMode ? 'bg-zinc-800 border-zinc-700 text-amber-400' : 'bg-white border-amber-200 text-amber-600 shadow-sm'}`}>
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto py-4 sm:py-8">
        
        {/* VIEW 1: PROFILE SELECTION */}
        {screen === 'profiles' && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fadeIn">
            <div className="text-center mb-8 sm:mb-10 px-2">
              <span className="text-5xl sm:text-6xl mb-3 inline-block drop-shadow-md">🏮</span>
              <h2 className="text-3xl sm:text-5xl font-black mb-2 tracking-tight">Chọn Hồ Sơ Học Tập</h2>
              <p className="text-xs sm:text-sm text-zinc-500 font-bold">Select your profile to start your language journey</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-xl mb-6 sm:mb-8">
              {profiles.map((p, idx) => (
                <div key={p.id} onClick={() => { setCurrentProfile(p); setScreen('dashboard'); }} className={`group relative p-5 sm:p-6 rounded-3xl border-2 transition-all cursor-pointer transform hover:-translate-y-1.5 hover:shadow-xl flex flex-col items-center text-center ${darkMode || p.level === 'advanced' ? 'bg-zinc-900 border-zinc-800 hover:border-amber-500' : 'bg-white border-amber-200 hover:border-amber-400 shadow-lg'}`}>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setEditingIndex(idx); setFormName(p.name); setFormEmoji(p.emoji); setFormLevel(p.level); setShowProfileModal(true); }} className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs flex items-center justify-center opacity-70 hover:opacity-100">✏️</button>
                  </div>
                  <span className="text-5xl sm:text-6xl mb-3 group-hover:scale-110 transition-transform">{p.emoji}</span>
                  <h3 className="font-black text-xl sm:text-2xl mb-1">{p.name}</h3>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 mb-2 sm:mb-3">{p.level}</span>
                  <div className="text-xs sm:text-sm font-black text-amber-500 flex items-center gap-1"><span>⭐</span> {p.stars || 0} Stars</div>
                </div>
              ))}
            </div>

            <button onClick={() => { setEditingIndex(-1); setFormName(''); setFormEmoji('👦'); setFormLevel('intermediate'); setShowProfileModal(true); }} className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-base sm:text-lg shadow-lg hover:shadow-orange-500/25 transition-all transform active:scale-95">
              ➕ Thêm Hồ Sơ Mới (New Profile)
            </button>
          </div>
        )}

        {/* VIEW 2: DASHBOARD & CURRICULUM MAP */}
        {screen === 'dashboard' && currentProfile && (
          <div className="animate-fadeIn">
            
            {/* User Banner */}
            <div className={`p-5 sm:p-6 rounded-3xl border mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl ${darkMode || isAdultMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-amber-200'}`}>
              <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-4xl shadow-inner">{currentProfile.emoji}</div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black">{currentProfile.name}</h2>
                  <p className="text-xs sm:text-sm font-bold text-zinc-500 capitalize">{currentProfile.level} • {isAdultMode ? 'Advanced / Adult Mode' : 'Learner Mode'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-around">
                <div className="text-center px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <div className="text-xl sm:text-2xl font-black text-amber-500">⭐ {currentProfile.stars || 0}</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Stars</div>
                </div>
                <button onClick={() => setScreen('profiles')} className="px-4 py-3 rounded-2xl font-black text-xs border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">🔄 Đổi</button>
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
              <button onClick={() => setScreen('test')} className="p-4 rounded-2xl bg-purple-600 text-white font-black shadow-lg hover:bg-purple-500 transition-all text-left flex flex-col justify-between h-24 sm:h-28">
                <span className="text-xl sm:text-2xl">📝</span>
                <div>
                  <div className="text-base sm:text-lg">Kiểm Tra</div>
                  <div className="text-[9px] sm:text-[10px] opacity-80 font-normal">Quiz & Review</div>
                </div>
              </button>
              <button onClick={() => setScreen('sentences')} className="p-4 rounded-2xl bg-emerald-600 text-white font-black shadow-lg hover:bg-emerald-500 transition-all text-left flex flex-col justify-between h-24 sm:h-28">
                <span className="text-xl sm:text-2xl">📖</span>
                <div>
                  <div className="text-base sm:text-lg">Đọc Hiểu</div>
                  <div className="text-[9px] sm:text-[10px] opacity-80 font-normal">Sentences</div>
                </div>
              </button>
              <button onClick={() => setScreen('music')} className="p-4 rounded-2xl bg-pink-600 text-white font-black shadow-lg hover:bg-pink-500 transition-all text-left flex flex-col justify-between h-24 sm:h-28">
                <span className="text-xl sm:text-2xl">🎵</span>
                <div>
                  <div className="text-base sm:text-lg">Âm Nhạc</div>
                  <div className="text-[9px] sm:text-[10px] opacity-80 font-normal">Kids Songs</div>
                </div>
              </button>
              <button onClick={() => handleResetProgress(currentProfile.id)} className="p-4 rounded-2xl bg-rose-600 text-white font-black shadow-lg hover:bg-rose-500 transition-all text-left flex flex-col justify-between h-24 sm:h-28">
                <span className="text-xl sm:text-2xl">🔄</span>
                <div>
                  <div className="text-base sm:text-lg">Cài Lại</div>
                  <div className="text-[9px] sm:text-[10px] opacity-80 font-normal">Reset Progress</div>
                </div>
              </button>
            </div>

            {/* Learning Curriculum Roadmap */}
            <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2"><span>🗺️</span> Bản Đồ Học Tập (Curriculum Map)</h3>
            
            <div className="space-y-4 sm:space-y-6">
              {(lang === 'es' ? CURRICUL_ES : CURRICUL_VI).map((unit) => (
                <div key={unit.id} className={`p-5 sm:p-6 rounded-3xl border transition-all ${darkMode || isAdultMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-amber-100 shadow-md'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl">{unit.icon}</span>
                      <div>
                        <h4 className="font-black text-lg sm:text-xl">{unit.title}</h4>
                        <p className="text-[11px] sm:text-xs font-bold text-zinc-500">{unit.desc}</p>
                      </div>
                    </div>
                    <button onClick={() => speakText(unit.title)} className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs">🔊</button>
                  </div>

                  {unit.type === 'vocab' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['beginner', 'intermediate', 'advanced'].map(lvl => {
                        const vocabList = unit.levels[lvl];
                        if (!vocabList) return null;
                        const isCompleted = currentProfile.progress[unit.id]?.[lvl];
                        return (
                          <button key={lvl} onClick={() => { setActiveLesson({ unitId: unit.id, level: lvl, items: vocabList }); setScreen('lesson'); }} className={`p-3.5 sm:p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${isCompleted ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200' : darkMode || isAdultMode ? 'bg-zinc-800 border-zinc-700 hover:border-amber-500' : 'bg-amber-50/50 border-amber-200 hover:border-amber-400'}`}>
                            <div className="flex items-center gap-3">
                              <span className="text-xl sm:text-2xl">{vocabList[0].emoji}</span>
                              <div className="text-left">
                                <div className="font-black capitalize text-xs sm:text-sm">{lvl}</div>
                                <div className="text-[9px] sm:text-[10px] text-zinc-500 font-bold">{vocabList.length} items</div>
                              </div>
                            </div>
                            {isCompleted ? <span className="text-lg sm:text-xl">⭐</span> : <span className="text-xs sm:text-sm">➡️</span>}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <button onClick={() => { setActiveLesson({ unitId: unit.id, type: unit.type }); setScreen(unit.type === 'alphabet' ? 'alphabet' : unit.type === 'blending' ? 'blending' : 'sentences'); }} className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                      <span>Bắt Đầu Khám Phá (Start Unit)</span> 🚀
                    </button>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* VIEW 3: VOCABULARY LESSON */}
        {screen === 'lesson' && activeLesson && (
          <VocabLessonScreen activeLesson={activeLesson} currentProfile={currentProfile} setProfiles={setProfiles} setScreen={setScreen} lang={lang} speakText={speakText} triggerConfetti={triggerConfetti} darkMode={darkMode || isAdultMode} />
        )}

        {/* VIEW 4: ALPHABET */}
        {screen === 'alphabet' && (
          <AlphabetScreen lang={lang} setScreen={setScreen} speakText={speakText} darkMode={darkMode || isAdultMode} />
        )}

        {/* VIEW 5: BLENDING */}
        {screen === 'blending' && (
          <BlendingScreen lang={lang} setScreen={setScreen} speakText={speakText} darkMode={darkMode || isAdultMode} />
        )}

        {/* VIEW 6: SENTENCES */}
        {screen === 'sentences' && (
          <SentenceGameScreen lang={lang} setScreen={setScreen} currentProfile={currentProfile} setProfiles={setProfiles} triggerConfetti={triggerConfetti} darkMode={darkMode || isAdultMode} />
        )}

        {/* VIEW 7: TEST & QUIZ */}
        {screen === 'test' && (
          <TestQuizScreen lang={lang} setScreen={setScreen} currentProfile={currentProfile} setProfiles={setProfiles} triggerConfetti={triggerConfetti} darkMode={darkMode || isAdultMode} />
        )}

        {/* VIEW 8: MUSIC ROOM */}
        {screen === 'music' && (
          <MusicRoomScreen lang={lang} setScreen={setScreen} darkMode={darkMode || isAdultMode} />
        )}

      </main>

      {/* PROFILE EDIT / ADD MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 border-4 shadow-2xl animate-scaleUp ${darkMode || isAdultMode ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-amber-300 text-zinc-900'}`}>
            <h3 className="text-xl sm:text-2xl font-black mb-6 border-b pb-3 border-zinc-200 dark:border-zinc-800">{editingIndex === -1 ? '➕ Thêm Hồ Sơ Mới' : '✏️ Chỉnh Sửa Hồ Sơ'}</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-500 mb-2">Tên (Name):</label>
                <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="VD: Khang, Sofia..." className={`w-full p-3 rounded-2xl border-2 font-bold ${darkMode || isAdultMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-500 mb-2">Biểu tượng (Emoji):</label>
                <input type="text" maxLength="2" value={formEmoji} onChange={(e) => setFormEmoji(e.target.value)} className={`w-full p-3 rounded-2xl border-2 text-2xl text-center font-bold ${darkMode || isAdultMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-500 mb-2">Cấp độ (Level / Mode):</label>
                <select value={formLevel} onChange={(e) => setFormLevel(e.target.value)} className={`w-full p-3 rounded-2xl border-2 font-bold ${darkMode || isAdultMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                  <option value="beginner">👶 Mới học (Beginner)</option>
                  <option value="intermediate">👦 Cơ bản (Intermediate)</option>
                  <option value="advanced">🎓 Nâng cao / Adult (Advanced)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowProfileModal(false)} className="flex-1 py-3 rounded-2xl font-black bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">Hủy</button>
              <button onClick={handleSaveProfile} className="flex-1 py-3 rounded-2xl font-black bg-amber-600 text-white shadow-lg">Lưu Hồ Sơ</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// --- SUB-SCREENS ---

function VocabLessonScreen({ activeLesson, currentProfile, setProfiles, setScreen, lang, speakText, triggerConfetti, darkMode }) {
  const [index, setIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const currentItem = activeLesson.items[index];

  useEffect(() => {
    if (currentItem) speakText(currentItem.word);
  }, [index]);

  const handleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'es' ? 'es-ES' : 'vi-VN';
    recognition.onstart = () => { setIsListening(true); setFeedback(lang === 'es' ? 'Escuchando...' : 'Đang lắng nghe...'); };
    recognition.onresult = (event) => {
      const said = event.results[0][0].transcript.toLowerCase();
      const target = currentItem.word.toLowerCase();
      if (said.includes(target) || target.includes(said)) {
        triggerConfetti();
        setFeedback('✨ Chính xác! Excellent!');
        setTimeout(() => handleNext(), 1200);
      } else {
        setFeedback(`Nghe được: "${said}". Thử lại nhé!`);
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleNext = () => {
    if (index + 1 < activeLesson.items.length) {
      setIndex(index + 1);
      setFeedback('');
    } else {
      triggerConfetti();
      const updated = { ...currentProfile };
      if (!updated.progress[activeLesson.unitId]) updated.progress[activeLesson.unitId] = {};
      if (!updated.progress[activeLesson.unitId][activeLesson.level]) {
        updated.progress[activeLesson.unitId][activeLesson.level] = true;
        updated.stars = (updated.stars || 0) + 2;
      }
      setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
      alert(lang === 'es' ? '¡Lección completada! +2 ⭐' : 'Hoàn thành bài học! Nhận +2 ⭐');
      setScreen('dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fadeIn px-2">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button onClick={() => setScreen('dashboard')} className="px-4 py-2 rounded-xl font-bold bg-zinc-200 dark:bg-zinc-800 text-sm">⬅️ Thoát</button>
        <div className="font-black text-amber-600 text-sm sm:text-base">Bài {index + 1} / {activeLesson.items.length}</div>
      </div>

      <div onClick={() => speakText(currentItem.word)} className={`w-full max-w-md p-8 sm:p-10 rounded-3xl border-4 shadow-2xl flex flex-col items-center text-center cursor-pointer transform hover:scale-105 transition-all ${darkMode ? 'bg-zinc-900 border-amber-500/50' : 'bg-white border-amber-400'}`}>
        <span className="text-7xl sm:text-8xl mb-6 animate-bounce">{currentItem.emoji}</span>
        <h2 className="text-3xl sm:text-5xl font-black mb-3">{currentItem.word}</h2>
        <p className="text-zinc-500 font-bold italic text-sm sm:text-base">💡 {currentItem.meaning}</p>
      </div>

      <div className="my-6 sm:my-8 flex gap-4">
        <button onClick={handleSpeechRecognition} className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-xl transition-all ${isListening ? 'bg-red-600 animate-pulse text-white' : 'bg-red-500 text-white hover:bg-red-600'}`}>
          🎤
        </button>
      </div>

      <p className="font-bold text-base sm:text-lg h-10 text-center px-4">{feedback || (lang === 'es' ? 'Toca el micrófono y repite' : 'Bấm mic và đọc theo')}</p>
      <button onClick={handleNext} className="mt-4 px-6 py-3 rounded-2xl bg-zinc-300 dark:bg-zinc-800 font-bold text-xs sm:text-sm">Bỏ qua / Tiếp ➡️</button>
    </div>
  );
}

function AlphabetScreen({ lang, setScreen, speakText, darkMode }) {
  const alphabet = lang === 'es' ? ALPHABET_ES : ALPHABET_VI;
  return (
    <div className="animate-fadeIn pb-12">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setScreen('dashboard')} className="px-4 py-2 rounded-xl font-bold bg-zinc-200 dark:bg-zinc-800 text-sm">⬅️ Trở Về</button>
        <h2 className="text-xl sm:text-2xl font-black text-amber-600">🪷 {lang === 'es' ? 'Alfabeto' : 'Bảng Chữ Cái'}</h2>
        <div></div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {alphabet.map((item, idx) => (
          <button key={idx} onClick={() => speakText(item.char, lang === 'es' ? 'es-ES' : 'vi-VN')} className={`p-3.5 sm:p-4 rounded-2xl border-2 flex flex-col items-center justify-center shadow-sm hover:scale-105 transition-transform ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-amber-200 text-zinc-900'}`}>
            <span className="text-2xl sm:text-3xl font-black text-amber-600 mb-1">{item.char}</span>
            <span className="text-xl sm:text-2xl">{item.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BlendingScreen({ lang, setScreen, speakText, darkMode }) {
  const examples = lang === 'es' ? [
    {consonant: 'Pe', vowel: 'rro', target: 'Perro', meaning: 'Dog'},
    {consonant: 'Ga', vowel: 'to', target: 'Gato', meaning: 'Cat'},
    {consonant: 'So', vowel: 'pa', target: 'Sopa', meaning: 'Soup'}
  ] : [
    {consonant: 'C', vowel: 'hó', target: 'Chó', meaning: 'Dog'},
    {consonant: 'M', vowel: 'èo', target: 'Mèo', meaning: 'Cat'},
    {consonant: 'Ph', vowel: 'ở', target: 'Phở', meaning: 'Pho soup'}
  ];
  
  const [idx, setIdx] = useState(0);
  const current = examples[idx];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fadeIn px-2">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button onClick={() => setScreen('dashboard')} className="px-4 py-2 rounded-xl font-bold bg-zinc-200 dark:bg-zinc-800 text-sm">⬅️ Thoát</button>
        <h2 className="font-black text-lg sm:text-xl text-amber-600">🧩 Đánh Vần</h2>
        <div></div>
      </div>

      <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border-4 shadow-xl text-center ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-amber-300'}`}>
        <p className="text-xs font-bold text-zinc-500 mb-6">Chạm vào từng phần để nghe âm thanh</p>
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
          <button onClick={() => speakText(current.consonant)} className="px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-2xl sm:text-3xl font-black">{current.consonant}</button>
          <span className="text-xl font-bold">+</span>
          <button onClick={() => speakText(current.vowel)} className="px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-2xl sm:text-3xl font-black">{current.vowel}</button>
          <span className="text-xl font-bold">=</span>
          <button onClick={() => speakText(current.target)} className="px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-emerald-600 text-white text-2xl sm:text-3xl font-black shadow-lg">{current.target}</button>
        </div>
        <p className="text-base sm:text-lg font-bold italic text-zinc-500">💡 Nghĩa: {current.meaning}</p>
      </div>

      <button onClick={() => setIdx((idx + 1) % examples.length)} className="mt-8 px-8 py-4 rounded-2xl bg-amber-600 text-white font-black shadow-lg">Từ Tiếp Theo ➡️</button>
    </div>
  );
}

function SentenceGameScreen({ lang, setScreen, currentProfile, setProfiles, triggerConfetti, darkMode }) {
  const levels = lang === 'es' ? [
    { title: "Oración Simple", words: ["El", "perro", "es", "marrón"], target: "El perro es marrón", meaning: "The dog is brown." },
    { title: "Comprensión de Menú", question: "¿Cuánto cuesta la Sopa Pho?", options: ["$9", "$3", "$12"], correct: 2, text: "MENÚ:\n- Sopa Pho: $12\n- Tacos: $9" }
  ] : [
    { title: "Ghép Câu Đơn", words: ["Con", "chó", "màu", "vàng"], target: "Con chó màu vàng", meaning: "The dog is yellow." },
    { title: "Đọc Hiểu Thực Đơn", question: "Giá của Phở Bò Đặc Biệt là bao nhiêu?", options: ["35k", "25k", "65k"], correct: 2, text: "MENU QUÁN:\n- Phở Bò: 65k\n- Bánh Mì: 35k" }
  ];

  const [lvlIndex, setLvlIndex] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [availableTokens, setAvailableTokens] = useState(() => [...(levels[0].words || [])].sort(() => 0.5 - Math.random()));
  const current = levels[lvlIndex];

  const handleCheck = () => {
    if (current.words) {
      if (selectedTokens.join(' ') === current.target) {
        triggerConfetti();
        advance();
      } else {
        alert('Chưa chính xác! Thử lại nhé.');
      }
    }
  };

  const advance = () => {
    if (lvlIndex + 1 < levels.length) {
      const nextIdx = lvlIndex + 1;
      setLvlIndex(nextIdx);
      if (levels[nextIdx].words) {
        setSelectedTokens([]);
        setAvailableTokens([...levels[nextIdx].words].sort(() => 0.5 - Math.random()));
      }
    } else {
      triggerConfetti();
      const updated = { ...currentProfile };
      if (!updated.progress['sentence_game']) updated.progress['sentence_game'] = {};
      updated.progress['sentence_game']['completed'] = true;
      updated.stars = (updated.stars || 0) + 3;
      setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
      alert('Tuyệt vời! Hoàn thành thử thách đọc hiểu (+3 ⭐)');
      setScreen('dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fadeIn px-2">
      <div className="w-full max-w-lg flex justify-between items-center mb-6">
        <button onClick={() => setScreen('dashboard')} className="px-4 py-2 rounded-xl font-bold bg-zinc-200 dark:bg-zinc-800 text-sm">⬅️ Thoát</button>
        <h2 className="font-black text-base sm:text-xl text-emerald-600">📖 Đọc Hiểu</h2>
        <div></div>
      </div>

      <div className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl border-4 shadow-xl ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-emerald-300'}`}>
        <h3 className="text-base sm:text-lg font-black mb-2">{current.title}</h3>
        {current.meaning && <p className="text-amber-500 font-bold mb-4 italic text-sm">💡 "{current.meaning}"</p>}
        {current.text && <pre className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 font-mono text-xs sm:text-sm mb-6 whitespace-pre-wrap">{current.text}</pre>}

        {current.words ? (
          <div>
            <div className="min-h-[70px] p-3 sm:p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 mb-6 flex flex-wrap gap-2 items-center justify-center">
              {selectedTokens.length === 0 ? <span className="text-zinc-400 font-bold italic text-xs sm:text-sm">Chạm các từ bên dưới để ghép câu...</span> : selectedTokens.map((t, i) => (
                <button key={i} onClick={() => { setSelectedTokens(selectedTokens.filter((_, idx) => idx !== i)); setAvailableTokens([...availableTokens, t]); }} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-500 text-white font-black shadow-md text-sm">{t}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {availableTokens.map((t, i) => (
                <button key={i} onClick={() => { setAvailableTokens(availableTokens.filter((_, idx) => idx !== i)); setSelectedTokens([...selectedTokens, t]); }} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 font-black shadow-sm text-sm">{t}</button>
              ))}
            </div>
            <button onClick={handleCheck} className="w-full py-3.5 sm:py-4 rounded-2xl bg-emerald-600 text-white font-black shadow-lg text-sm sm:text-base">Kiểm Tra 🌟</button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="font-black text-base sm:text-lg mb-4">{current.question}</p>
            {current.options.map((opt, i) => (
              <button key={i} onClick={() => { if (i === current.correct) { triggerConfetti(); advance(); } else { alert('Sai rồi! Thử lại.'); } }} className="w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left font-bold hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-colors text-sm sm:text-base">{i + 1}. {opt}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TestQuizScreen({ lang, setScreen, currentProfile, setProfiles, triggerConfetti, darkMode }) {
  const pool = lang === 'es' ? [
    {word: 'Perro', emoji: '🐶'}, {word: 'Gato', emoji: '🐱'}, {word: 'Sopa', emoji: '🍲'}, {word: 'Pan', emoji: '🥖'}
  ] : [
    {word: 'Chó', emoji: '🐶'}, {word: 'Mèo', emoji: '🐱'}, {word: 'Phở', emoji: '🍲'}, {word: 'Bánh mì', emoji: '🥖'}
  ];

  const [qIndex, setQIndex] = useState(0);
  const currentQ = pool[qIndex % pool.length];

  const options = [currentQ.word, ...pool.filter(p => p.word !== currentQ.word).slice(0, 3).map(p => p.word)].sort(() => 0.5 - Math.random());

  const handleAnswer = (opt) => {
    if (opt === currentQ.word) {
      triggerConfetti();
      if (qIndex + 1 < 3) {
        setQIndex(qIndex + 1);
      } else {
        const updated = { ...currentProfile };
        updated.stars = (updated.stars || 0) + 3;
        setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
        alert('Xuất sắc! Hoàn thành bài kiểm tra (+3 ⭐)');
        setScreen('dashboard');
      }
    } else {
      alert('Chưa chính xác! Thử lại nhé.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fadeIn px-2">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button onClick={() => setScreen('dashboard')} className="px-4 py-2 rounded-xl font-bold bg-zinc-200 dark:bg-zinc-800 text-sm">⬅️ Thoát</button>
        <h2 className="font-black text-base sm:text-xl text-purple-600">📝 Kiểm Tra</h2>
        <div></div>
      </div>

      <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border-4 shadow-xl text-center ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-purple-300'}`}>
        <span className="text-7xl sm:text-8xl mb-6 inline-block">{currentQ.emoji}</span>
        <h3 className="text-lg sm:text-xl font-black mb-6">Chọn từ đúng với hình ảnh trên:</h3>
        
        <div className="grid grid-cols-1 gap-3">
          {options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt)} className="p-3.5 sm:p-4 rounded-2xl bg-purple-100 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-black text-lg sm:text-xl border-2 border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform">{opt}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MusicRoomScreen({ lang, setScreen, darkMode }) {
  const songs = lang === 'es' ? SONGS_ES : SONGS_VI;
  return (
    <div className="animate-fadeIn pb-12 px-2">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setScreen('dashboard')} className="px-4 py-2 rounded-xl font-bold bg-zinc-200 dark:bg-zinc-800 text-sm">⬅️ Trở Về</button>
        <h2 className="text-xl sm:text-2xl font-black text-pink-600">🎵 Phòng Âm Nhạc</h2>
        <div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {songs.map((song, i) => (
          <div key={i} className={`p-5 sm:p-6 rounded-3xl border-4 shadow-xl ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-pink-200'}`}>
            <h3 className="font-black text-lg sm:text-xl mb-4 text-pink-600">🎶 {song.title}</h3>
            <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <iframe width="100%" height="100%" src={`https://www.youtube-nocookie.com/embed/${song.id}?rel=0`} title={song.title} frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
