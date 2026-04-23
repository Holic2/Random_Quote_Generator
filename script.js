// ===== Quote Data =====
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Passion"
  },
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Resilience"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "Persistence"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Dreams"
  },
  {
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa",
    category: "Kindness"
  },
  {
    text: "When you reach the end of your rope, tie a knot in it and hang on.",
    author: "Franklin D. Roosevelt",
    category: "Resilience"
  },
  {
    text: "Always remember that you are absolutely unique. Just like everyone else.",
    author: "Margaret Mead",
    category: "Identity"
  },
  {
    text: "Do not go where the path may lead; go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
    category: "Courage"
  },
  {
    text: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou",
    category: "Strength"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Resilience"
  },
  {
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    category: "Life"
  },
  {
    text: "Never let the fear of striking out keep you from playing the game.",
    author: "Babe Ruth",
    category: "Courage"
  },
  {
    text: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
    category: "Adventure"
  },
  {
    text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas A. Edison",
    category: "Persistence"
  },
  {
    text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
    author: "Dr. Seuss",
    category: "Empowerment"
  },
  {
    text: "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
    category: "Life"
  },
  {
    text: "If you look at what you have in life, you'll always have more.",
    author: "Oprah Winfrey",
    category: "Gratitude"
  },
  {
    text: "If you want to live a happy life, tie it to a goal, not to people or things.",
    author: "Albert Einstein",
    category: "Purpose"
  },
  {
    text: "Never let the fear of striking out keep you from playing the game.",
    author: "Babe Ruth",
    category: "Courage"
  }
];

// ===== State =====
let currentIndex = -1;

// ===== DOM References =====
const quoteText    = document.getElementById('quoteText');
const quoteAuthor  = document.getElementById('quoteAuthor');
const quoteCategory= document.getElementById('quoteCategory');
const quoteNumber  = document.getElementById('quoteNumber');
const quoteCount   = document.getElementById('quoteCount');
const quoteCard    = document.getElementById('quoteCard');
const tweetBtn     = document.getElementById('tweetBtn');
const copyBtn      = document.getElementById('copyBtn');

// ===== Helper: pad number =====
function pad(n) {
  return String(n).padStart(2, '0');
}

// ===== Get random index (avoid repeat) =====
function getRandomIndex() {
  if (quotes.length === 1) return 0;
  let idx;
  do {
    idx = Math.floor(Math.random() * quotes.length);
  } while (idx === currentIndex);
  return idx;
}

// ===== Generate Quote =====
function generateQuote() {
  // Fade out
  quoteCard.classList.add('fade-out');

  setTimeout(() => {
    currentIndex = getRandomIndex();
    const { text, author, category } = quotes[currentIndex];

    quoteText.textContent     = text;
    quoteAuthor.textContent   = `— ${author}`;
    quoteCategory.textContent = category;
    quoteNumber.textContent   = pad(currentIndex + 1);
    quoteCount.textContent    = `${currentIndex + 1} of ${quotes.length} quotes`;

    // Update tweet link
    const tweet = encodeURIComponent(`"${text}" — ${author}`);
    tweetBtn.href = `https://twitter.com/intent/tweet?text=${tweet}`;

    // Reset copy button
    copyBtn.classList.remove('copied');
    copyBtn.querySelector('span:last-child').textContent = 'Copy';

    // Fade in
    quoteCard.classList.remove('fade-out');
  }, 280);
}

// ===== Copy Quote =====
function copyQuote() {
  const { text, author } = quotes[currentIndex];
  const content = `"${text}" — ${author}`;

  navigator.clipboard.writeText(content).then(() => {
    copyBtn.classList.add('copied');
    copyBtn.querySelector('span:last-child').textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.querySelector('span:last-child').textContent = 'Copy';
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    copyBtn.querySelector('span:last-child').textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.querySelector('span:last-child').textContent = 'Copy';
    }, 2000);
  });
}

// ===== Keyboard Shortcut =====
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowRight') {
    e.preventDefault();
    generateQuote();
  }
});

// ===== Init: load a random quote on page load =====
generateQuote();
