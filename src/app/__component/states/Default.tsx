
import { ButtonHTMLAttributes, useState, ReactNode} from "react";
import type { DialogState } from "../types/dialogTypes";
import { cn } from "../lib/utils";

type DefaultProp = {
  handleNext: (state: DialogState) => void;
};

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  onClick: () => void;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

const Button = ({
  onClick,
  label,
  icon,
  disabled,
  className = "",
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        "h-12 w-full justify-between flex items-center rounded-xl bg-white text-center border border-black-a4 duration-100 ease-out transition-[background] hover:bg-black-a1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-a4 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 px-4",
        !disabled && "cursor-pointer",
        className,
      )}
      {...rest}
    >
      {label}
      {icon && (
        <div className="flex shrink-0 items-center justify-center size-8 outline-1 outline-black-a4 bg-white rounded-lg">
          {icon}
        </div>
      )}
    </button>
  );
};

export const Default = ({ handleNext }: DefaultProp) => {
  const [email, setEmail] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="pt-8 w-full  max-w-full m-[0px_auto] xs:w-78 ">
      <div className="flex flex-col items-center justify-center w-full mt-3 gap-y-4">
        <div className="h-12 w-full flex justify-center cursor-text bg-white rounded-xl border border-black-a4">
          <div className="flex relative gap-x-2 min-w-60 ">
            <div className="h-full flex shrink-0 items-center ml-2 ">
              <svg
                width="26"
                height="23"
                viewBox="0 0 26 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.71094 5.63086L11.4189 10.7532C12.3951 11.3274 13.6058 11.3274 14.5819 10.7532L23.2899 5.63086"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M1.61056 8.60088C1.73239 6.61446 1.79331 5.62126 2.27991 4.72178C2.68136 3.9797 3.40956 3.25186 4.15183 2.85078C5.05155 2.36463 6.06751 2.30281 8.09943 2.17919C9.76756 2.0777 11.526 2 13 2C14.474 2 16.2324 2.0777 17.9006 2.17919C19.9325 2.30281 20.9485 2.36463 21.8482 2.85078C22.5904 3.25186 23.3186 3.9797 23.7201 4.72178C24.2067 5.62126 24.2676 6.61446 24.3894 8.60088C24.4553 9.67381 24.5 10.7477 24.5 11.6842C24.5 12.6207 24.4553 13.6946 24.3894 14.7675C24.2676 16.754 24.2067 17.7472 23.7201 18.6466C23.3186 19.3887 22.5904 20.1166 21.8482 20.5176C20.9485 21.0038 19.9325 21.0656 17.9006 21.1892C16.2324 21.2907 14.474 21.3684 13 21.3684C11.526 21.3684 9.76756 21.2907 8.09943 21.1892C6.06751 21.0656 5.05155 21.0038 4.15183 20.5176C3.40956 20.1166 2.68136 19.3887 2.27991 18.6466C1.79331 17.7472 1.73239 16.754 1.61056 14.7675C1.54475 13.6946 1.5 12.6207 1.5 11.6842C1.5 10.7477 1.54475 9.67381 1.61056 8.60088Z"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div className="h-full w-full flex-1 ">
              <input
                autoComplete="off"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter" && isValidEmail) {
                    handleNext("Email");
                  }
                }}
                type="email"
                placeholder="Continue with Email"
                className="border-0 outline-0  text- focus-within:outline-0 focus:outline-0 placeholder:text-base focus-visible:outline-0 h-full w-full "
              />
            </div>
            <Button
              onClick={() => handleNext("Email")}
              label={<span className="text-xs">submit</span>}
              disabled={!isValidEmail}
              className="h-full w-auto justify-center border-0 bg-transparent hover:bg-transparent"
            />
          </div>
        </div>

        <div className="text-center text-[16px] text-black-a6 leading-5.25 font-normal">
          <span>or select a wallet from the list below</span>
        </div>

        {/* argent wallet */}

        <Button
          onClick={() => handleNext("Argent")}
          label="Argent"
          icon={
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" fill="white"></rect>
              <path
                d="M18.3242 7.63647H13.6516C13.4955 7.63647 13.3704 7.76611 13.367 7.92726C13.2726 12.4568 10.9768 16.7559 7.02532 19.8009C6.89986 19.8976 6.87128 20.0792 6.963 20.21L9.69685 24.112C9.78986 24.2448 9.97107 24.2747 10.0986 24.1772C12.5694 22.2856 14.5567 20.0038 15.9879 17.4746C17.4191 20.0038 19.4065 22.2856 21.8773 24.1772C22.0047 24.2747 22.186 24.2448 22.2791 24.112L25.013 20.21C25.1045 20.0792 25.0759 19.8976 24.9506 19.8009C20.999 16.7559 18.7033 12.4568 18.609 7.92726C18.6056 7.76611 18.4803 7.63647 18.3242 7.63647Z"
                fill="var(--color-p3-orange)"
              ></path>
            </svg>
          }
        ></Button>

        {/* Coinbase Wallet */}
        <Button
          onClick={() => handleNext("Coinbase")}
          label="CoinBase"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="10"
                fill="var(--color-p3-coinbase)"
              ></circle>
              <rect
                rx="27%"
                width="20"
                height="20"
                fill="var(--color-p3-coinbase)"
              ></rect>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.0001 17C13.8661 17 17.0001 13.866 17.0001 10C17.0001 6.13401 13.8661 3 10.0001 3C6.13413 3 3.00012 6.13401 3.00012 10C3.00012 13.866 6.13413 17 10.0001 17ZM8.25012 7.71429C7.95427 7.71429 7.71441 7.95414 7.71441 8.25V11.75C7.71441 12.0459 7.95427 12.2857 8.25012 12.2857H11.7501C12.046 12.2857 12.2858 12.0459 12.2858 11.75V8.25C12.2858 7.95414 12.046 7.71429 11.7501 7.71429H8.25012Z"
                fill="white"
              ></path>
            </svg>
          }
        ></Button>

        <button className="h-12 w-full justify-between flex items-center cursor-pointer rounded-xl  bg-white text-center border border-black-a4 focus-visible:ring-2 focus-visible:ring-black-a4 focus-visible:ring-offset-2 duration-100 hover:bg-black-a1 transition-[background] ease-in px-4 ">
          Other Wallets
          <div className="size-8 overflow-hidden outline-1 outline-black-a4 bg-white rounded-lg p-0.5">
            <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-full h-full">
              <div className="rounded-[27.5%] overflow-hidden">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill="#AB9FF2"
                    d="M5.13 19.2c2.297 0 4.023-1.92 5.053-3.436a2.9 2.9 0 0 0-.195.994c0 .885.53 1.516 1.574 1.516 1.433 0 2.965-1.208 3.758-2.51a2 2 0 0 0-.083.524c0 .617.362 1.006 1.1 1.006 2.324 0 4.663-3.959 4.663-7.421C21 7.175 19.58 4.8 16.016 4.8 9.752 4.8 3 12.154 3 16.905 3 18.771 4.044 19.2 5.13 19.2m8.729-9.622c0-.671.39-1.141.96-1.141.557 0 .947.47.947 1.14 0 .672-.39 1.155-.947 1.155-.57 0-.96-.483-.96-1.154m2.979 0c0-.671.39-1.141.96-1.141.557 0 .947.47.947 1.14 0 .672-.39 1.155-.947 1.155-.57 0-.96-.483-.96-1.154"
                  />
                </svg>
              </div>
              <div className="rounded-[27.5%] overflow-hidden">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill="#2461ED"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.42 11.57C11.122 9.856 7.11 7.635 4.09 5.825 3.201 5.21 3.653 3.9 4.73 3.9h14.94c.833 0 1.39.893.973 1.569-1.004 1.666-2.47 3.782-3.694 5.46-.657.9-1.728 1.054-2.529.64m-4.81.555c3.189 1.633 7.656 4.117 10.83 5.996.984.581.59 1.977-.555 1.977l-7.951.001-7.8.001c-.916 0-1.386-.913-.997-1.55 1.315-2.153 2.792-4.326 4.02-5.948.546-.723 1.657-.886 2.454-.477"
                  />
                </svg>
              </div>
              <div className="rounded-[27.5%] overflow-hidden">
                <svg
                  className="w-full max-w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill="url(#rainbow__a)"
                    d="M3 7.05h1.35c6.959 0 12.6 5.641 12.6 12.6V21h2.7A1.35 1.35 0 0 0 21 19.65C21 10.454 13.546 3 4.35 3A1.35 1.35 0 0 0 3 4.35z"
                  />
                  <path
                    fill="url(#rainbow__b)"
                    d="M17.4 19.65H21A1.35 1.35 0 0 1 19.65 21H17.4z"
                  />
                  <path
                    fill="url(#rainbow__c)"
                    d="M4.35 3v3.6H3V4.35C3 3.604 3.604 3 4.35 3"
                  />
                  <path
                    fill="url(#rainbow__d)"
                    d="M3 6.6h1.35c7.207 0 13.05 5.843 13.05 13.05V21h-4.05v-1.35a9 9 0 0 0-9-9H3z"
                  />
                  <path fill="url(#rainbow__e)" d="M13.8 19.65h3.6V21h-3.6z" />
                  <path fill="url(#rainbow__f)" d="M3 10.2V6.6h1.35v3.6z" />
                  <path
                    fill="url(#rainbow__g)"
                    d="M3 12.45c0 .745.604 1.35 1.35 1.35a5.85 5.85 0 0 1 5.85 5.85c0 .745.604 1.35 1.35 1.35h2.25v-1.35a9.45 9.45 0 0 0-9.45-9.45H3z"
                  />
                  <path
                    fill="url(#rainbow__h)"
                    d="M10.2 19.65h3.6V21h-2.25a1.35 1.35 0 0 1-1.35-1.35"
                  />
                  <path
                    fill="url(#rainbow__i)"
                    d="M4.35 13.8A1.35 1.35 0 0 1 3 12.45V10.2h1.35z"
                  />
                  <defs>
                    <radialGradient
                      id="rainbow__a"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="rotate(-90 12 7.65)scale(16.6499)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".77" stopColor="#FF4000" />
                      <stop offset="1" stopColor="#8754C9" />
                    </radialGradient>
                    <radialGradient
                      id="rainbow__d"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="rotate(-90 12 7.65)scale(13.05)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".724" stopColor="#FFF700" />
                      <stop offset="1" stopColor="#FF9901" />
                    </radialGradient>
                    <radialGradient
                      id="rainbow__g"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="rotate(-90 12 7.65)scale(9.44997)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".595" stopColor="#0AF" />
                      <stop offset="1" stopColor="#01DA40" />
                    </radialGradient>
                    <radialGradient
                      id="rainbow__h"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(3.82499 0 0 10.2 9.975 20.325)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0AF" />
                      <stop offset="1" stopColor="#01DA40" />
                    </radialGradient>
                    <radialGradient
                      id="rainbow__i"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(0 -3.82499 72.5331 0 3.675 14.025)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0AF" />
                      <stop offset="1" stopColor="#01DA40" />
                    </radialGradient>
                    <linearGradient
                      id="rainbow__b"
                      x1="17.175"
                      x2="21"
                      y1="20.325"
                      y2="20.325"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF4000" />
                      <stop offset="1" stopColor="#8754C9" />
                    </linearGradient>
                    <linearGradient
                      id="rainbow__c"
                      x1="3.675"
                      x2="3.675"
                      y1="3"
                      y2="6.825"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#8754C9" />
                      <stop offset="1" stopColor="#FF4000" />
                    </linearGradient>
                    <linearGradient
                      id="rainbow__e"
                      x1="13.8"
                      x2="17.4"
                      y1="20.325"
                      y2="20.325"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FFF700" />
                      <stop offset="1" stopColor="#FF9901" />
                    </linearGradient>
                    <linearGradient
                      id="rainbow__f"
                      x1="3.675"
                      x2="3.675"
                      y1="10.2"
                      y2="6.6"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FFF700" />
                      <stop offset="1" stopColor="#FF9901" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="rounded-[27.5%] overflow-hidden">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill="#0500FF"
                    d="M3.9 5.6 12 3v18c-5.786-2.4-8.1-7-8.1-9.6z"
                  />
                  <path
                    fill="url(#trust__a)"
                    d="M20.1 5.6 12 3v18c5.786-2.4 8.1-7 8.1-9.6z"
                  />
                  <defs>
                    <linearGradient
                      id="trust__a"
                      x1="17.948"
                      x2="11.967"
                      y1="1.74"
                      y2="20.797"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".02" stopColor="#00F" />
                      <stop offset=".08" stopColor="#0094FF" />
                      <stop offset=".16" stopColor="#48FF91" />
                      <stop offset=".42" stopColor="#0094FF" />
                      <stop offset=".68" stopColor="#0038FF" />
                      <stop offset=".9" stopColor="#0500FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </button>

        <div
          role="button"
          className="flex group cursor-pointer items-center gap-x-2 h-16  text-black-a6 hover:text-black-a8 transition-colors duration-200 font-normal leading-5 "
        >
          <svg
            className="size-5 text-black-a6 group-hover:text-black-a8"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="8"
          >
            <path
              fill="currentColor"
              d="M4 4a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H4Zm-1 8.268V11c0-.552.448-1 1.001-1H20c.553 0 1.001.448 1.001 1v1.268A1.99 1.99 0 0 0 20 12h-4c-.552 0-1.007.528-1.236 1.103-.32.804-.975 1.754-2.764 1.754-1.71 0-2.518-.868-2.806-1.647-.228-.615-.695-1.21-1.28-1.21H4a1.99 1.99 0 0 0-1 .268ZM19.999 8c.35 0 .688.06 1.001.171V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v1.171C3.313 8.061 3.65 8 4.001 8H20Z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="leading-4.75 tracking-[-0.0182px] text-[15px]">
            I don&apos;t have a wallet
          </span>
        </div>
      </div>
    </div>
  );
};
