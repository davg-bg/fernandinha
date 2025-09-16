// Elementos do DOM
const gifts = document.querySelectorAll(".gift-box");
const messageContainer = document.getElementById("messageContainer");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const closeButton = document.getElementById("closeMessage");

// Array de títulos especiais para cada tipo de mensagem
const messageTitles = {
  strength: "💪 Força Interior 💪",
  inspiration: "✨ Luz Inspiradora ✨",
  dreams: "🌟 Sonhos Realizáveis 🌟",
  future: "🌈 Futuro Brilhante 🌈",
  kindness: "🌺 Coração Gentil 🌺",
  heart: "💖 Alma Bonita 💖",
  joy: "😊 Alegria Contagiante 😊",
  determination: "🏆 Determinação Admirável 🏆",
  love: "💕 Amor Verdadeiro 💕",
  creativity: "🎨 Criatividade Única 🎨",
  gratitude: "🙏 Gratidão Diária 🙏",
  power: "✨ Poder Interior ✨",
  peace: "🕊️ Paz e Harmonia 🕊️",
  resilience: "🌱 Força Resiliente 🌱",
  uniqueness: "🦄 Ser Única 🦄"
};

// Cores de confete para cada tipo
const confettiColors = {
  strength: ['#ff6b6b', '#ee5a24', '#ffffff'],
  inspiration: ['#feca57', '#ff9ff3', '#ffffff'],
  dreams: ['#48dbfb', '#0abde3', '#ffffff'],
  future: ['#ff9ff3', '#f368e0', '#ffffff'],
  kindness: ['#ff6348', '#ff4757', '#ffffff'],
  heart: ['#ff3838', '#ff6b81', '#ffffff'],
  joy: ['#ffa502', '#ff6348', '#ffffff'],
  determination: ['#3742fa', '#2f3542', '#ffffff'],
  love: ['#ff6b81', '#ff4757', '#ffffff'],
  creativity: ['#7bed9f', '#70a1ff', '#ffffff'],
  gratitude: ['#ffa726', '#ffcc02', '#ffffff'],
  power: ['#a55eea', '#8c7ae6', '#ffffff'],
  peace: ['#7bed9f', '#2ed573', '#ffffff'],
  resilience: ['#26de81', '#20bf6b', '#ffffff'],
  uniqueness: ['#fd79a8', '#e84393', '#ffffff']
};

// Função para criar confetes personalizados
function createCustomConfetti(type) {
  const colors = confettiColors[type] || ['#ff4081', '#ff6ec7', '#ffffff'];
  
  // Primeira explosão
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: colors,
    shapes: ['circle', 'square'],
    gravity: 0.8,
    drift: 0.1
  });
  
  // Segunda explosão (mais intensa)
  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 },
      colors: colors,
      shapes: ['circle', 'square', 'triangle'],
      gravity: 0.6,
      drift: 0.2
    });
  }, 300);
  
  // Terceira explosão (chuva de corações)
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#ff6b81', '#ff4757', '#fd79a8'],
      shapes: ['circle'],
      gravity: 0.4,
      drift: 0.3,
      scalar: 1.2
    });
  }, 600);
}

// Função para mostrar mensagem
function showMessage(gift) {
  const message = gift.getAttribute("data-message");
  const type = gift.getAttribute("data-type");
  const title = messageTitles[type] || "💌 Mensagem Especial 💌";
  
  messageTitle.textContent = title;
  messageText.textContent = message;
  messageContainer.style.display = "flex";
  
  // Adicionar classe para animação
  messageContainer.classList.add('show');
  
  // Criar confetes personalizados
  createCustomConfetti(type);
  
  // Adicionar efeito sonoro (se disponível)
  playNotificationSound();
}

// Função para fechar mensagem
function closeMessage() {
  messageContainer.classList.remove('show');
  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 300);
}

// Função para tocar som de notificação (opcional)
function playNotificationSound() {
  // Criar um tom suave usando Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    // Silenciosamente falha se Web Audio API não estiver disponível
    console.log("Audio não disponível");
  }
}

// Event listeners
gifts.forEach((gift, index) => {
  // Adicionar delay na animação inicial
  gift.style.animationDelay = `${index * 0.1}s`;
  
  gift.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Adicionar efeito visual no clique
    gift.style.transform = "scale(0.9)";
    setTimeout(() => {
      gift.style.transform = "";
    }, 150);
    
    // Mostrar mensagem após pequeno delay
    setTimeout(() => {
      showMessage(gift);
    }, 200);
  });
  
  // Efeito hover melhorado
  gift.addEventListener("mouseenter", () => {
    gift.style.animationPlayState = "paused";
  });
  
  gift.addEventListener("mouseleave", () => {
    gift.style.animationPlayState = "running";
  });
});

// Event listener para fechar mensagem
closeButton.addEventListener("click", closeMessage);

// Fechar mensagem clicando no fundo
messageContainer.addEventListener("click", (e) => {
  if (e.target === messageContainer) {
    closeMessage();
  }
});

// Fechar mensagem com tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && messageContainer.style.display === "flex") {
    closeMessage();
  }
});

// Animação de entrada dos presentes
window.addEventListener("load", () => {
  gifts.forEach((gift, index) => {
    setTimeout(() => {
      gift.style.opacity = "1";
      gift.style.transform = "translateY(0)";
    }, index * 100);
  });
});

// Efeito de partículas flutuantes no fundo
function createFloatingParticles() {
  const particles = ['✨', '💖', '🌟', '💫', '🌸', '🦋'];
  
  setInterval(() => {
    const particle = document.createElement('div');
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh';
    particle.style.fontSize = Math.random() * 20 + 10 + 'px';
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '0';
    particle.style.animation = `floatUp ${Math.random() * 3 + 4}s linear forwards`;
    
    document.body.appendChild(particle);
    
    // Remover partícula após animação
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 7000);
  }, 2000);
}

// CSS para animação das partículas
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    from {
      transform: translateY(0) rotate(0deg);
      opacity: 0.7;
    }
    to {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
  
  .message-container.show {
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);

// Iniciar partículas flutuantes
createFloatingParticles();

// Adicionar efeito de cursor personalizado
document.addEventListener('mousemove', (e) => {
  // Criar pequenas estrelas que seguem o cursor
  if (Math.random() < 0.1) {
    const star = document.createElement('div');
    star.textContent = '✨';
    star.style.position = 'fixed';
    star.style.left = e.clientX + 'px';
    star.style.top = e.clientY + 'px';
    star.style.pointerEvents = 'none';
    star.style.fontSize = '12px';
    star.style.opacity = '0.7';
    star.style.zIndex = '999';
    star.style.animation = 'fadeOut 1s ease-out forwards';
    
    document.body.appendChild(star);
    
    setTimeout(() => {
      if (star.parentNode) {
        star.parentNode.removeChild(star);
      }
    }, 1000);
  }
});

// CSS para fade out das estrelas do cursor
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  @keyframes fadeOut {
    from {
      opacity: 0.7;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(1.5);
    }
  }
`;
document.head.appendChild(cursorStyle);
