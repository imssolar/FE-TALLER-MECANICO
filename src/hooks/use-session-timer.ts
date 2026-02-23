import { useEffect, useState, useRef } from "react";
import { STORAGE_KEYS } from "@/constants/session";

interface UseSessionTimerProps {
  timeInSeconds: number;
}

export function useSessionTimer({ timeInSeconds }: UseSessionTimerProps) {
  const [showModal, setShowModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const modalTriggeredRef = useRef(false);

  useEffect(() => {
    const startTime = localStorage.getItem(STORAGE_KEYS.SESSION_START);
    if (startTime) {
      setSessionStart(parseInt(startTime));
    }
  }, []);

  useEffect(() => {
    if (!sessionStart) return;

    const updateRemainingTime = () => {
      const elapsedSeconds = Math.floor((Date.now() - sessionStart) / 1000);
      const remaining = timeInSeconds - elapsedSeconds;
      setRemainingTime(Math.max(0, remaining));

      if (remaining <= 0 && !modalTriggeredRef.current) {
        modalTriggeredRef.current = true;
        setShowModal(true);
      }
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [timeInSeconds, sessionStart]);

  const resetTimer = () => {
    const newStartTime = Date.now();
    localStorage.setItem(STORAGE_KEYS.SESSION_START, newStartTime.toString());
    setSessionStart(newStartTime);
    modalTriggeredRef.current = false;
    setShowModal(false);
    setRemainingTime(timeInSeconds);
  };

  return { showModal, remainingTime, resetTimer };
}
