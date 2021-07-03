import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { format, add } from "date-fns";

export default function TaskDate({ setTaskDate }) {
  return (
    <Menu
      className="border border-gray-primary"
      align="center"
      position="auto"
      arrow={true}
      portal={true}
      menuButton={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      }
    >
      <MenuItem
        className="border-b border-gray-primary"
        styles={{ active: "bg-primary" }}
        onClick={() => setTaskDate(format(new Date(), "yyyy, M, dd"))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-1 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Today
      </MenuItem>

      <MenuItem
        className="border-b border-gray-primary"
        onClick={() =>
          setTaskDate(format(add(new Date(), { days: 1 }), "yyyy, M, dd"))
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-1 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        Tomorrow
      </MenuItem>
      <MenuItem
        onClick={() =>
          setTaskDate(format(add(new Date(), { days: 7 }), "yyyy, M, dd"))
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-1 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
        Next Week
      </MenuItem>
    </Menu>
  );
}
