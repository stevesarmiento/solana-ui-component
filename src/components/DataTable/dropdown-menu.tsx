import React from 'react';
import { type Theme } from './themes';

export interface DropdownMenuProps {
  /** Label for the dropdown button */
  buttonLabel: React.ReactNode;
  /** Content to show in the dropdown menu */
  children: React.ReactNode;
  /** Optional custom classNames for the button */
  buttonClassName?: string;
  /** Optional custom classNames for the dropdown panel */
  dropdownClassName?: string;
  /** Optional alignment of the dropdown panel */
  align?: 'left' | 'right';
  /** Optional controlled state for dropdown open status */
  isOpen?: boolean;
  /** Optional handler for dropdown open state changes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Optional flag to show or hide the dropdown caret icon */
  showCaret?: boolean;
  /** Optional variant for the button styling */
  variant?: 'default' | 'ghost';
  /** Optional theme */
  theme?: Theme;
}

/**
 * A reusable dropdown menu component that can be triggered by a button.
 * Can be used in various contexts like toolbars, table rows, or forms.
 */
export function DropdownMenu({
  buttonLabel,
  children,
  buttonClassName = '',
  dropdownClassName = '',
  align = 'right',
  isOpen: controlledIsOpen,
  onOpenChange,
  showCaret = true,
  variant = 'default',
  theme = 'default',
}: DropdownMenuProps) {
  const [internalIsOpen, setInternalIsOpen] = React.useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const menuRef = React.useRef<HTMLDivElement>(null);
  
  // Handler for toggling the dropdown
  const toggleDropdown = () => {
    const newState = !isOpen;
    if (onOpenChange) {
      onOpenChange(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  // Handle clicking outside to close the dropdown
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (onOpenChange) {
          onOpenChange(false);
        } else {
          setInternalIsOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef, onOpenChange]);

  // Button styling based on theme and variant
  let buttonStyle = '';
  
  if (theme === 'windows95') {
    buttonStyle = variant === 'ghost' 
      ? "inline-flex justify-center bg-[#c0c0c0] px-3 py-1 text-sm font-bold text-black hover:bg-[#d0d0d0]"
      : "inline-flex justify-center w-full bg-[#c0c0c0] px-4 py-1 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white text-sm font-bold";
  } else {
    buttonStyle = variant === 'ghost'
      ? "inline-flex justify-center w-full rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-150 ease-in-out"
      : "inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-indigo-50 focus:border-gray-300 transition-all duration-150 ease-in-out";
  }
  
  // Default dropdown panel styling based on theme
  let dropdownStyle = '';
  
  if (theme === 'windows95') {
    dropdownStyle = "origin-top-right absolute mt-1 w-auto min-w-38 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] z-10";
  } else {
    dropdownStyle = "origin-top-right absolute mt-2 w-auto min-w-38 rounded-md shadow-lg bg-white ring-1 ring-black/10 z-10 focus:outline-none";
  }
  
  // Apply alignment
  const alignmentClass = align === 'left' ? 'left-0' : 'right-0';

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div>
        <button
          type="button"
          className={buttonClassName || buttonStyle}
          id="dropdown-menu-button" 
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          {buttonLabel}
          {showCaret && (
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className={`${dropdownStyle} ${alignmentClass} ${dropdownClassName}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-menu-button"
        >
          <div className="p-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * A predefined item for the dropdown menu.
 */
export function DropdownMenuItem({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'default',
  theme = 'default',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'destructive';
  theme?: Theme;
}) {
  let menuItemStyle = '';
  
  if (theme === 'windows95') {
    menuItemStyle = variant === 'destructive'
      ? "block w-full text-left px-4 py-2 text-sm text-red-700 bg-[#c0c0c0] hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
      : "block w-full text-left px-4 py-2 text-sm font-bold bg-[#c0c0c0] hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed";
  } else {
    menuItemStyle = variant === 'destructive'
      ? "block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:bg-red-50 focus:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
      : "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
  }
  
  return (
    <button
      role="menuitem"
      className={className || menuItemStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/**
 * A predefined checkbox item for the dropdown menu.
 */
export function DropdownMenuCheckboxItem({
  children,
  checked,
  onChange,
  id,
  disabled = false,
  className = '',
  theme = 'default',
}: {
  children: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
  className?: string;
  theme?: Theme;
}) {
  let checkboxItemStyle = '';
  
  if (theme === 'windows95') {
    checkboxItemStyle = "flex items-center px-4 py-2 text-sm font-bold bg-[#c0c0c0] hover:bg-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  } else {
    checkboxItemStyle = "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  }
  
  return (
    <label
      className={className || checkboxItemStyle}
      role="menuitemcheckbox"
      aria-checked={checked}
      htmlFor={id}
    >
      <input
        type="checkbox"
        className={theme === 'windows95' 
          ? "h-4 w-4 border-2 border-gray-800 mr-3" 
          : "form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-3"
        }
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        id={id}
        disabled={disabled}
      />
      <span>{children}</span>
    </label>
  );
}

/**
 * A simple divider line for the dropdown menu.
 */
export function DropdownMenuDivider({ theme = 'default' }: { theme?: Theme }) {
  return <div className={theme === 'windows95' 
    ? "h-[2px] my-1 bg-gray-400" 
    : "h-px my-1 bg-gray-200"
  } role="separator" />;
}

/**
 * A label for grouping items within the dropdown menu.
 */
export function DropdownMenuLabel({
  children,
  className = '',
  theme = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  theme?: Theme;
}) {
  let labelStyle = '';
  
  if (theme === 'windows95') {
    labelStyle = "px-3 py-1 text-xs font-bold text-gray-900 uppercase tracking-wide";
  } else {
    labelStyle = "px-3 py-1 text-xs font-medium text-gray-400 uppercase tracking-wide";
  }
  
  return (
    <div className={className || labelStyle} role="presentation">
      {children}
    </div>
  );
}