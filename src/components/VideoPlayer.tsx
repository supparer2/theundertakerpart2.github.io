import React, { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  movieTitle: string;
  duration: number;
  thumbnailUrl: string;
  youtubeVideoId?: string;
}

export default function VideoPlayer({ 
  movieTitle, 
  duration, 
  thumbnailUrl 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const totalDurationInSeconds = duration * 60;

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setIsBuffering(true);
      setTimeout(() => setIsBuffering(false), 1500);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * totalDurationInSeconds;
    
    setCurrentTime(newTime);
    setIsBuffering(true);
    setTimeout(() => setIsBuffering(false), 800);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isBuffering) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDurationInSeconds) {
            setIsPlaying(false);
            return totalDurationInSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isBuffering, totalDurationInSeconds]);

  const progressPercentage = (currentTime / totalDurationInSeconds) * 100;

  return (
    <div style={{ width: '100%', height: '0', paddingBottom: '56.25%', position: 'relative', backgroundColor: '#000', borderRadius: '0.5rem', overflow: 'hidden' }}>
      <div 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Background Image */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: isPlaying ? 'blur(20px) brightness(0.3)' : 'brightness(0.5)',
            transition: 'all 0.5s',
            zIndex: 1
          }}
        />

        {/* HD Badge */}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 20 }}>
          <div style={{
            background: 'linear-gradient(to right, #eab308, #ca8a04)',
            color: '#000',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.375rem',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            HD 1080p
          </div>
        </div>

        {/* Buffering Spinner */}
        {isBuffering && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 30
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '6rem',
                height: '6rem',
                border: '4px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                borderTopColor: '#fff',
                borderRightColor: '#fff',
                animation: 'spin 1s linear infinite'
              }} />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }} />
              </div>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  backgroundColor: '#fff',
                  borderRadius: '50%'
                }} />
              </div>
            </div>
          </div>
        )}

        {/* Play Button Overlay */}
        {!isPlaying && !isBuffering && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20
          }}>
            <button
              onClick={togglePlay}
              style={{
                width: '5rem',
                height: '5rem',
                backgroundColor: '#dc2626',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Play video"
            >
              <svg style={{ width: '2.5rem', height: '2.5rem', color: '#fff', marginLeft: '0.25rem' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            </button>
          </div>
        )}

        {/* Click Area for Pause */}
        {isPlaying && !isBuffering && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              zIndex: 10
            }}
            onClick={togglePlay}
          />
        )}

        {/* Controls */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8), transparent)',
            padding: '1rem',
            transition: 'all 0.3s',
            transform: (showControls || !isPlaying) ? 'translateY(0)' : 'translateY(100%)',
            opacity: (showControls || !isPlaying) ? 1 : 0,
            zIndex: 40
          }}
        >
          {/* Progress Bar */}
          <div 
            ref={progressRef}
            style={{
              width: '100%',
              height: '0.375rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '9999px',
              cursor: 'pointer',
              marginBottom: '0.75rem',
              position: 'relative'
            }}
            onClick={handleProgressClick}
          >
            <div 
              style={{
                height: '100%',
                background: 'linear-gradient(to right, #ef4444, #dc2626)',
                borderRadius: '9999px',
                width: `${progressPercentage}%`,
                transition: 'width 0.3s',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '0.75rem',
                height: '0.75rem',
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }} />
            </div>
          </div>

          {/* Controls Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Left Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={togglePlay}
                style={{
                  color: '#fff',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg style={{ width: '2rem', height: '2rem' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg style={{ width: '2rem', height: '2rem' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                )}
              </button>

              <div style={{ color: '#fff', fontSize: '0.875rem', fontWeight: '500', minWidth: '100px' }}>
                {formatTime(currentTime)} / {formatTime(totalDurationInSeconds)}
              </div>
            </div>

            {/* Right Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Volume Control */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={toggleMute}
                  style={{
                    color: '#fff',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  ) : (
                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: '5rem',
                    height: '0.25rem',
                    borderRadius: '9999px',
                    appearance: 'none',
                    cursor: 'pointer',
                    background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>

              <div style={{ color: '#fff', fontSize: '0.875rem', fontWeight: '600', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {movieTitle}
              </div>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          input[type="range"]::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
        `}} />
      </div>
    </div>
  );
}
