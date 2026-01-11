/**
 * Entry Page
 * 
 * Name + avatar selection page.
 * First screen players see.
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createSession, joinGame } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export function EntryPage() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'create' | 'join' | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [avatarId, setAvatarId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { setSession } = useAuthStore();
  const navigate = useNavigate();
  
  // Handle invite link with game code in URL
  useEffect(() => {
    const joinCode = searchParams.get('join');
    if (joinCode) {
      setMode('join');
      setGameCode(joinCode.toUpperCase());
    }
  }, [searchParams]);

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await createSession(displayName, avatarId);
      setSession(response.session);
      navigate('/waiting');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(false);

    try {
      const response = await joinGame(displayName, avatarId, gameCode);
      setSession(response.session);
      navigate('/waiting');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join game');
    } finally {
      setLoading(false);
    }
  };

  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-pink-300 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white/10 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-white">🎮 Simon Says</h1>
          <p className="text-white/70 text-center mb-6 sm:mb-8 text-sm sm:text-base">Color Race Edition</p>
          
          <div className="flex flex-col items-center gap-10">
            <button
              onClick={() => setMode('create')}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 active:from-purple-800 active:to-pink-700 active:scale-98 text-white font-bold py-2.5 px-12 rounded-lg transition-all duration-75 text-sm min-w-[180px]"
              style={{ touchAction: 'manipulation' }}
            >
              🚀 Create Game
            </button>
            
            <button
              onClick={() => setMode('join')}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 active:from-blue-800 active:to-cyan-700 active:scale-98 text-white font-bold py-2.5 px-12 rounded-lg transition-all duration-75 text-sm min-w-[180px]"
              style={{ touchAction: 'manipulation' }}
            >
              🤝 Join Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-pink-300 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white/10 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full">
        <button
          onClick={() => setMode(null)}
          className="text-white/70 hover:text-white active:text-white mb-4 text-sm sm:text-base"
        >
          ← Back
        </button>
        
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
          {mode === 'create' ? 'Create Game' : 'Join Game'}
        </h2>
        
        <form onSubmit={mode === 'create' ? handleCreateGame : handleJoinGame} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              minLength={3}
              maxLength={12}
              required
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-sm sm:text-base text-white placeholder-white/50"
            />
          </div>
          
          {mode === 'join' && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                Game Code
                {searchParams.get('join') && (
                  <span className="ml-2 text-xs text-green-400 font-normal">
                    ✅ Pre-filled from invite link
                  </span>
                )}
              </label>
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                placeholder="ABCDEF"
                maxLength={6}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent uppercase text-sm sm:text-base text-white placeholder-white/50"
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
              Avatar
            </label>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {['1', '2', '3', '4', '5', '6', '7', '8'].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setAvatarId(id)}
                  className={`p-2.5 sm:p-4 rounded-lg border-2 transition-all duration-75 active:scale-95 min-h-[56px] min-w-[56px] ${
                    avatarId === id
                      ? 'border-white bg-white/20'
                      : 'border-white/30 hover:border-white/50 active:border-white/70 bg-white/10'
                  }`}
                  style={{ touchAction: 'manipulation' }}
                >
                  <span className="text-2xl sm:text-3xl">{['😀', '🎮', '🚀', '⚡', '🎨', '🎯', '🏆', '🌟'][parseInt(id) - 1]}</span>
                </button>
              ))}
            </div>
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-400 text-red-200 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 active:from-purple-800 active:to-pink-700 active:scale-98 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2.5 px-8 rounded-lg transition-all duration-75 text-sm"
              style={{ touchAction: 'manipulation' }}
            >
              {loading ? 'Loading...' : mode === 'create' ? 'Create Game' : 'Join Game'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
