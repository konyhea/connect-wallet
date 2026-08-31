// otp styled input

import { AnimatePresence, motion, useAnimation } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const DIGIT_EASE = [0.25, 1, 0.5, 1] as const;
const EXIT_DURATION = 0.12;
const ENTER_DURATION = 0.22;
const LENGTH = 6;

type OtpInputProps = {
  length?: number;
  onComplete?: (code: string) => void;
  inValid?: boolean;
  onInvalidHandled?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  loading?: boolean;
};

const OtpInput = ({
  length = LENGTH,
  onComplete,
  inValid = true,
  onInvalidHandled,
  disabled = false,
  autoFocus = true,
  loading = false,
}: OtpInputProps) => {
  const [value, setValue] = useState("");
  const [IsFocused, setIsFocused] = useState<boolean>(false);
  const [prevInvalid, setPrevInvalid] = useState(inValid);
  const [lastDelta, setLastDelta] = useState<"type" | "bulk">("type");

  const [showError, setShowError] = useState(inValid);

  const prevLengthRef = useRef(0);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const shakeControls = useAnimation();

  if (inValid && !prevInvalid) {
    setValue("");
    setShowError(true);
  }
  if (inValid !== prevInvalid) {
    setPrevInvalid(inValid);
  }
  useEffect(() => {
    if (!inValid) return;
    shakeControls.start({
      x: [0, -6, 6, -4, 4, 0],
      transition: {
        duration: 0.35,
        ease: "easeInOut",
      },
    });
    hiddenInputRef.current?.focus();
    prevLengthRef.current = 0;
    const timeout = setTimeout(() => {
      setShowError(false);
      onInvalidHandled?.();
    }, 900);
    return () => clearTimeout(timeout);
  }, [inValid, shakeControls, onInvalidHandled]);

  const handleFocus = () => {
    setIsFocused(true);
    if (showError) {
      setShowError(false);
      onInvalidHandled?.();
    }
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, length);
      const delta = raw.length - prevLengthRef.current;
      setLastDelta(delta > 1 ? "bulk" : "type");
      prevLengthRef.current = raw.length;
      setValue(raw);
      if (raw.length == length) onComplete?.(raw);
    },
    [length, onComplete]
  );

  const chars = value.split("");
  const activeIndex = Math.min(value.length, length - 1);
  const midpoint = length % 2 == 0 ? length / 2 : null;

  return (
    <motion.div
      animate={shakeControls}
      className="relative m-[0_auto] inline-flex max-w-86 items-center justify-stretch gap-2 select-none sm:gap-3"
    >
      <input
        ref={hiddenInputRef}
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="\d*"
        value={value}
        maxLength={length}
        disabled={disabled || loading}
        autoFocus={autoFocus}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label={`${length}-digit verification code`}
        type="text"
        className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0 disabled:cursor-not-allowed"
      />
      {Array.from({ length }).map((_, i) => {
        const char = chars[i];
        const isActive = IsFocused && i == activeIndex && !disabled;
        const showDivider = midpoint !== null && i === midpoint;
        return (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            {showDivider && (
              <span className="h-0.5 w-2 shrink-0 rounded-full bg-(--body-color-muted) opacity-40"></span>
            )}
            <div
              className={[
                "relative flex h-14 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl text-[1.1875rem] font-medium tabular-nums",
                "bg-(--input-background) transition-[box-shadow,color] duration-300",
                showError
                  ? "text-(--danger) shadow-[inset_0_0_0_1px_var(--danger)]"
                  : "text-(--input-color) shadow-[inset_0_0_0_1px_var(--border,transparent)]",
                disabled && "opacity-40",
              ].join(" ")}
            >
              {isActive && !showError && (
                <motion.div
                  layoutId="otp-active-indicator"
                  className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_2px_var(--primary)]"
                  transition={{
                    duration: ENTER_DURATION,
                    ease: DIGIT_EASE,
                  }}
                />
              )}
              <span
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-(--input-placeholder) transition-opacity duration-300"
                style={{
                  opacity: char ? 0 : 1,
                }}
              >
                0
              </span>
              <AnimatePresence mode="popLayout" initial={false}>
                {char && (
                  <motion.span
                    key={`${i}-${char}`}
                    initial={{
                      opacity: 0,
                      y: 6,
                    }}
                    animate={
                      loading
                        ? {
                            opacity: 1,
                            y: 0,
                            backgroundPositionX: ["150%", "-150%"],
                          }
                        : {
                            opacity: 1,
                            y: 0,
                          }
                    }
                    transition={
                      loading
                        ? {
                            opacity: {
                              duration: ENTER_DURATION,
                              ease: DIGIT_EASE,
                            },
                            y: {
                              duration: ENTER_DURATION,
                              ease: DIGIT_EASE,
                            },
                            backgroundPositionX: {
                              duration: 1.1,
                              repeat: Infinity,
                              ease: "linear",
                              delay: i * 0.08,
                            },
                          }
                        : {
                            duration: ENTER_DURATION,
                            ease: DIGIT_EASE,
                            delay: lastDelta === "bulk" ? i * 0.03 : 0,
                          }
                    }
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: EXIT_DURATION,
                      },
                    }}
                    className="relative"
                    style={
                      loading
                        ? {
                            backgroundImage:
                              "linear-gradient(90deg, var(--input-color) 35%, var(--input-placeholder) 50%, var(--input-color) 65%)",
                            backgroundSize: "220% 100%",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                          }
                        : undefined
                    }
                  >
                    {char}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default OtpInput;
