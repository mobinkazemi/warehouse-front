import React, { useState } from "react";
import type { MenuProps } from "antd";
import "./sliderMenuStyle.css";
import { ROLE_LOCAL_STORAGE_ENUM } from "../../shared/enums/localStorageRoleKey.enum";
import { TOKEN_KEY_ENUM } from "../../shared/enums/token.enum";
import { ProjectRole } from "../../shared/enums/project.roles.enum";
import { superAdminMenuItems } from "./getSliderMenuByRole/for-super-admin";
import { technicalManagerMenuItems } from "./getSliderMenuByRole/for-technical-manager";
import { othersMenuItems } from "./getSliderMenuByRole/others";
import {
  ArrowRightCircle,
  ArrowRightCircleIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "@/shared/enums/routes.enum";
// Import framer-motion directly
import * as framerMotion from "framer-motion";

// Destructure what we need from framer-motion
const { motion, AnimatePresence } = framerMotion;

let items: any = [];
if (localStorage.getItem(TOKEN_KEY_ENUM.ACCESS)) {
  switch (localStorage.getItem(ROLE_LOCAL_STORAGE_ENUM.ROLE)) {
    case ProjectRole.Super_Admin:
      items = superAdminMenuItems;
      break;
    case ProjectRole.Technical_Manager:
      // items = technicalManagerMenuItems;
      items = othersMenuItems;
      break;
    default:
      items = othersMenuItems;
      break;
  }
} else {
  items = [];
}

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

// Update SliderMenu component to accept onClick as a prop
interface SliderMenuProps {
  onClick: (e: any, key: string) => void;
  current: string;
}

const SliderMenu: React.FC<SliderMenuProps> = ({ onClick, current }) => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const navigator = useNavigate();

  const onOpenKeys = (key: string) => {
    const isKeyOpen = stateOpenKeys.find((item) => item === key);
    if (isKeyOpen) {
      const newOpenKeyData = stateOpenKeys.filter((item) => item !== key);
      setStateOpenKeys(newOpenKeyData);
    } else {
      setStateOpenKeys([...stateOpenKeys, key]);
    }
  };

  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const childrenVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  const chevronVariants = {
    up: { rotate: 180, transition: { duration: 0.3 } },
    down: { rotate: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="p-4 h-full absolute w-full sidBarEffect"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white text-[#1E2226] h-full rounded-3xl shadow-lg flex flex-col gap-12 overflow-auto"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <motion.div
          className="w-full flex justify-center items-center"
          whileHover="hover"
        >
          <motion.img
            className="w-28"
            src="/douranLogo.png"
            onClick={() => navigator(ROUTES_ENUM.HOME)}
            variants={logoVariants}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>

        <motion.div
          className="w-full flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item: any) => (
            <motion.div
              key={item?.key}
              onClick={(e) =>
                item?.children ? onOpenKeys(item?.key) : onClick(e, item?.key)
              }
              className={`flex flex-col mx-2 px-4 rounded-3xl py-2.5 gap-2 cursor-pointer hover:bg-[#FE7E05] hover:text-white ${
                item.key === current || current.includes(item.key)
                  ? "bg-[#FE7E05] text-white"
                  : ""
              }`}
              variants={menuItemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="flex items-center justify-between">
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                  <p className="text-sm font-semibold">{item.label}</p>
                </motion.div>
                {item?.children && (
                  <motion.div
                    variants={chevronVariants}
                    animate={stateOpenKeys.includes(item?.key) ? "up" : "down"}
                  >
                    {stateOpenKeys.includes(item?.key) ? (
                      <ChevronUp className="w-6 h-5" />
                    ) : (
                      <ChevronDown className="w-6 h-5" />
                    )}
                  </motion.div>
                )}
              </div>

              <AnimatePresence>
                {stateOpenKeys.includes(item?.key) && (
                  <motion.div
                    className="flex flex-col gap-3 pr-4 border-r border-r-gray-400 mx-2"
                    variants={childrenVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {item?.children?.map((child: any) => (
                      <motion.div
                        onClick={(e) => onClick(e, child?.key)}
                        key={child.key}
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.p
                          className={`text-xs font-bold cursor-pointer hover:bg-white hover:text-[#FE7E05] rounded-xl px-2 py-1.5 ${
                            current === child.key
                              ? "text-[#FE7E05] bg-white"
                              : ""
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {child.label}
                        </motion.p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <motion.div
            className={`flex flex-col mx-2 px-4 rounded-3xl py-2.5 gap-2 cursor-pointer hover:bg-[#FE7E05] hover:text-white`}
            variants={menuItemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => {
              localStorage.removeItem("access_token");
              navigate("/login");
            }}
          >
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-2"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRightCircle style={{ fontSize: "1.5rem" }} />
                <p className="text-sm font-semibold">خروج از حساب کاربری</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SliderMenu;
