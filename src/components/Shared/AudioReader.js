import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const AudioButton = styled.button`
  cursor: pointer;
  background: #43aa8b;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: 700;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #2a6f61;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

export default function AudioReader({ texto }) {
  const [falando, setFalando] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [suportaSpeech, setSuportaSpeech] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSuportaSpeech(false);
      return;
    }
    const handleVoicesChanged = () => {
      // Voz será setada quando criar o utterance
    };
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const falarTexto = () => {
    if (!texto) return;

    // Se estiver falando e não pausado, pausa
    if (falando && !pausado) {
      window.speechSynthesis.pause();
      setPausado(true);
      return;
    }

    // Se estiver pausado, resume
    if (falando && pausado) {
      window.speechSynthesis.resume();
      setPausado(false);
      return;
    }

    // Se não estiver falando, começa a falar
    if (!falando) {
      const utterance = new SpeechSynthesisUtterance(texto);
      const voices = window.speechSynthesis.getVoices();
      // Procura voz pt-BR mais natural (exemplo usa "brazil" no nome)
      const vozPTBR =
        voices.find(
          (v) =>
            v.lang === "pt-BR" &&
            (v.name.toLowerCase().includes("brazil") ||
              v.name.toLowerCase().includes("br"))
        ) || voices.find((v) => v.lang === "pt-BR") || voices[0];
      if (vozPTBR) utterance.voice = vozPTBR;
      utterance.lang = "pt-BR";
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => setFalando(true);
      utterance.onend = () => {
        setFalando(false);
        setPausado(false);
      };
      utterance.onpause = () => setPausado(true);
      utterance.onresume = () => setPausado(false);
      utterance.onerror = () => {
        setFalando(false);
        setPausado(false);
        alert("Erro na síntese de voz");
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Limpa fala se texto mudar durante fala
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      setFalando(false);
      setPausado(false);
    };
  }, [texto]);

  if (!suportaSpeech) return null;

  return (
    <AudioButton
      onClick={falarTexto}
      aria-pressed={falando && !pausado}
      aria-label={
        falando
          ? pausado
            ? "Retomar leitura"
            : "Pausar leitura"
          : "Ler texto em voz alta"
      }
    >
      <Icon>{falando ? (pausado ? "🔈" : "🔊") : "🔉"}</Icon>
      {falando ? (pausado ? "Retomar leitura" : "Pausar leitura") : "Ler em voz alta"}
    </AudioButton>
  );
}
