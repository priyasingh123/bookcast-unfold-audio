import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Share, Heart, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Book } from "@/hooks/useBooks";
import SecureAudioPlayer from "@/components/SecureAudioPlayer";

const SUPABASE_URL = "https://hryrkyufzevewzovwqer.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyeXJreXVmemV2ZXd6b3Z3cWVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTEyMTMyMCwiZXhwIjoyMDY2Njk3MzIwfQ._53yFYdSJbcDzvegAloxrAeuvHdnVMyN4Yu2KsYqt4Y";

const PlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching book:", error);
          return;
        }

        if (data) {
          setBook({
            ...data,
            cover: data.cover_url,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleShare = () => {
    if (!book) return;

    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Listen to ${book.title} by ${book.author}`,
        url: window.location.href,
      });
    }
  };

  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-lg">Book not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronDown size={24} className="text-white" />
        </button>
        <div className="text-center">
          <p className="text-gray-400 text-sm">PUBLIC STREAMING</p>
          <p className="text-gray-500 text-xs">
            {user ? "Progress Saved" : "Sign in to save progress"}
          </p>
        </div>
        <button
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          onClick={handleShare}
        >
          <Share size={24} className="text-white" />
        </button>
      </div>

      {/* Album Art */}
      <div className="flex-1 flex items-center justify-center px-8 py-8">
        <div className="w-full max-w-sm">
          <img
            src={
              book.cover ||
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
            }
            alt={book.title}
            className="w-full aspect-square object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Player Controls */}
      <div className="px-6 pb-8">
        {/* Track Info */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
            {book.title}
          </h1>
          <p className="text-gray-400 mb-1">{book.author}</p>
          <p className="text-gray-500 text-sm">
            {book.genre}
            {book.duration && ` • ${book.duration}`}
          </p>
        </div>

        {/* Public Audio Player */}
        <SecureAudioPlayer
          bookId={id || "1"}
          audioPath={book.audio_path || "alchemist.mp3"}
          onPlayStateChange={handlePlayStateChange}
        />

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-8">
          <button
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            onClick={handleShare}
          >
            <Share size={24} className="text-gray-400 hover:text-white" />
          </button>

          <button
            onClick={() => {
              if (!user) {
                navigate("/auth");
                return;
              }
              setIsLiked(!isLiked);
            }}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Heart
              size={24}
              className={`${
                isLiked
                  ? "text-purple-400 fill-current"
                  : "text-gray-400 hover:text-white"
              }`}
            />
          </button>
        </div>

        {/* Sign in prompt for additional features */}
        {!user && (
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-2">
              Want to save your progress and create playlists?
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="text-purple-400 hover:text-purple-300 text-sm font-semibold"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerPage;
