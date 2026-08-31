"use client";

import { Dialog } from "radix-ui";
import useMeasure from "react-use-measure";
import { useMediaQuery } from "./hooks/useMediaQuery";


import { motion, AnimatePresence } from "motion/react";
import { SPRING, SHEET_EASE } from  "./config/token"


// states for the different view
import { Default } from "./states/Default";
import { Email } from "./states/Email";
import { Metamask } from "./states/Metamask";
import { Wallets } from "./states/Wallets";
import { Argent } from "./states/Argent";
import { CoinBase } from "./states/Coinbase";

import type { DialogState } from "./types/dialogTypes"
import { useState } from "react";

const STEPS: Record<
  DialogState,
  {
    component: React.ComponentType<{
      handleNext: (state: DialogState) => void;
    }>;
    label: string;
  }
> = {
  Default: {
    component: Default,
    label: "Connect Wallet",
  },

  Argent: {
    component: Argent,
    label: "Scan with Argent",
  },
  Email: {
    component: Email,
    label: "Sign In Email",
  },
  Metamask: {
    component: Metamask,
    label: "Scan with MetaMask",
  },
  Wallets: {
    component: Wallets,
    label: "Choose Wallet",
  },
  Coinbase: {
    component: CoinBase,
    label: "Coinbase Wallet",
  },
};

const SignInDialog = () => {
  const [step, setStep] = useState<DialogState>("Default");
  const [isOpen, setIsOpen] = useState(false);
  const [measureRef, bounds] = useMeasure({
    offsetSize: true,
  });
  const isDesktop = useMediaQuery("(min-width: 440px)");
  const [justEntered, setJustEntered] = useState<boolean>(true);

  // ease: [0.23, 1, 0.32, 1]
  const ICON_SWAP_TRANSITION = {
    duration: 0.18,
    delay: 0.03,
    ease: "easeIn" as const,
  };
  const sheetVariants = isDesktop
    ? {
        initial: {
          opacity: 0,
          scale: 0.95,
        },
        animate: {
          opacity: 1,
          scale: 1,
        },
        exit: {
          opacity: 0,
          scale: 0.95,
        },
      }
    : {
        initial: {
          opacity: 0,
          y: "100%",
        },
        animate: {
          opacity: 1,
          y: "0%",
        },
        exit: {
          opacity: 0,
          y: "100%",
        },
      };

  // helpers for handling dialog
  const handleNext = (next: DialogState) => {
    setStep(next);
    setJustEntered(false);
  };
  const handleBack = () => {
    setStep("Default");
    setJustEntered(true);
  };
  const handleClose = () => handleIsOpen(false);

  const handleIsOpen = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setStep("Default");
      setJustEntered(true);
    }
  };

  const ActiveView = STEPS[step].component;
  const ActiveLabel = STEPS[step].label;
  const entering = step === "Default" && justEntered;

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleIsOpen}>
      <Dialog.Trigger asChild>
        <button className="cursor-pointer h-11 px-4 rounded-full  bg-white text-center border border-black-a4 focus-visible:ring-2 focus-visible:ring-black-a4 focus-visible:ring-offset-2 duration-100 active:scale-95">
          connect wallet
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <div className="fixed inset-0 z-129292 flex items-end justify-center xs:items-center ">
          <Dialog.Overlay
            forceMount
            className="fixed inset-0 transition-[background] min-h-dvh select-none bg-black-a7 z-1 animate-overlay"
          />

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="z-23 w-full xs:w-auto"
                key="sheet"
                {...sheetVariants}
                transition={{ duration: 0.3, delay: 0.032, ease: SHEET_EASE }}
              >
                <Dialog.Content forceMount asChild>
                  <div className="font-openRhude font-medium bg-white rounded-t-2xl select-none xs:rounded-xl">
                    {/* <div className="absolute w-full xs:w-auto z-3 bottom-[-5px] font-openRhude font-medium  bg-white rounded-t-2xl select-none xs:top-1/2 xs:left-1/2 xs:-translate-y-1/2 xs:bottom-auto xs:-translate-x-1/2 xs:rounded-[12px]"> */}
                    <header className="relative w-full ">
                      <div className="w-full transition-[width] z-3 h-16 absolute top-1 pointer-events-auto ">
                        <button
                          aria-label="close dialog"
                          onClick={handleClose}
                          className="cursor-pointer absolute top-5.5 flex items-center justify-center size-8 xs:right-5.5 right-4.25"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 13L13 1M1 1L13 13"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                            ></path>
                          </svg>
                        </button>
                        <div className="absolute top-5.75 left-5 size-8">
                          {/* animate this for fluid transition */}
                          <AnimatePresence mode="popLayout" initial={false}>
                            {step === "Default" ? (
                              <motion.button
                                key="help"
                                aria-label="ask help"
                                initial={{
                                  opacity: 0,
                                  x: -8,
                                  // scale: 0.92,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  // scale: 1,
                                }}
                                exit={{
                                  opacity: 0,
                                  x: -8,
                                  // scale: 0.92,
                                }}
                                transition={ICON_SWAP_TRANSITION}
                                onClick={handleBack}
                                className="flex -top-px -left-0.75  items-center justify-center absolute inset-0 xs:-translate-x-px cursor-pointer"
                              >
                                <svg
                                  className="block relative"
                                  aria-hidden="true"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 22 22"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM11.6445 12.7051C11.6445 13.1348 11.3223 13.4678 10.7744 13.4678C10.2266 13.4678 9.92578 13.1885 9.92578 12.6191V12.4795C9.92578 11.4268 10.4951 10.8574 11.2686 10.3203C12.2031 9.67578 12.665 9.32129 12.665 8.59082C12.665 7.76367 12.0205 7.21582 11.043 7.21582C10.3232 7.21582 9.80762 7.57031 9.45312 8.16113C9.38282 8.24242 9.32286 8.32101 9.2667 8.39461C9.04826 8.68087 8.88747 8.8916 8.40039 8.8916C8.0459 8.8916 7.66992 8.62305 7.66992 8.15039C7.66992 7.96777 7.70215 7.7959 7.75586 7.61328C8.05664 6.625 9.27051 5.75488 11.1182 5.75488C12.9336 5.75488 14.5234 6.71094 14.5234 8.50488C14.5234 9.7832 13.7822 10.417 12.7402 11.1045C11.999 11.5986 11.6445 11.9746 11.6445 12.5762V12.7051ZM11.9131 15.5625C11.9131 16.1855 11.376 16.6797 10.7529 16.6797C10.1299 16.6797 9.59277 16.1748 9.59277 15.5625C9.59277 14.9395 10.1191 14.4453 10.7529 14.4453C11.3867 14.4453 11.9131 14.9287 11.9131 15.5625Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </motion.button>
                            ) : (
                              <motion.button
                                key="back"
                                aria-label="go back"
                                onClick={handleBack}
                                initial={{
                                  opacity: 0,
                                  // scale: 0.92,
                                  x: 8,
                                }}
                                animate={{
                                  opacity: 1,
                                  // scale: 1,
                                  x: 0,
                                }}
                                exit={{
                                  opacity: 0,
                                  // scale: 0.92,
                                  x: 8,
                                }}
                                transition={ICON_SWAP_TRANSITION}
                                className="flex -top-px -left-0.75  items-center justify-center absolute inset-0 xs:-translate-x-px cursor-pointer"
                              >
                                <svg
                                  className="block relative"
                                  width="9"
                                  height="16"
                                  viewBox="0 0 9 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  data-projection-id="21"
                                >
                                  <path
                                    d="M8 1L1 8L8 15"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="top-6.75 xs:top-6.25 left-1/2 h-6.5 text-center -translate-x-1/2 absolute w-full pointer-events-none">
                          <div className="absolute flex justify-center inset-[0px_52px]">
                            <div className="max-h-full max-w-full flex justify-center items-center font-medium">
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                  key={step}
                                  initial={{
                                    opacity: 0,
                                    y: 6,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    y: -6,
                                  }}
                                  transition={{
                                    duration: 0.15,
                                    // ease: SHEET_EASE
                                    ease: [0.25, 0.1, 0.25, 1.0],
                                  }}
                                >
                                  {ActiveLabel}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </div>
                    </header>
                    <motion.div
                      animate={{ height: bounds.height || "auto" }}
                      transition={SPRING}
                      className="overflow-hidden will-change-transform"
                    >
                      <div
                        ref={measureRef}
                        className="will-change-transform relative"
                      >
                        <AnimatePresence mode="popLayout">
                          <motion.div
                            key={step}
                            initial={{
                              opacity: 0,
                              scale: entering ? 1.1 : 0.85,
                            }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                              ease: [0.25, 0.1, 0.25, 1.0],
                              duration: 0.2,
                              delay: 0.02,
                            }}
                          >
                            <div className="w-full m-[0px_auto] px-6 py-7.75 xs:px-6 xs:pt-7.25 xs:pb-6 pointer-events-auto">
                              <ActiveView handleNext={handleNext} />
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                </Dialog.Content>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SignInDialog;
