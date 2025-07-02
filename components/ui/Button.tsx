// components/ui/Button.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react'; // LucideIcon 타입 임포트

/**
 * Button 컴포넌트의 props 타입 정의
 * variant: 버튼 스타일 (primary, secondary, outline, ghost, destructive)
 * size: 버튼 크기 (sm, md, lg, xl)
 * icon: 버튼 내부에 표시될 Lucide 아이콘 컴포넌트
 * iconPosition: 아이콘 위치 (left, right)
 * loading: 로딩 상태 여부
 * fullWidth: 버튼이 부모 너비를 꽉 채울지 여부
 * children: 버튼 내부에 렌더링될 내용 (텍스트 등)
 * 나머지 HTML 버튼 속성들은 React.ButtonHTMLAttributes<HTMLButtonElement>를 통해 전달
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

/**
 * 재사용 가능한 Button 컴포넌트
 * Tailwind CSS를 사용하여 다양한 스타일과 크기, 다크 모드를 지원합니다.
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary', // 기본 variant는 'primary'
  size = 'md',         // 기본 size는 'md'
  icon: Icon,          // Lucide 아이콘 컴포넌트 (대문자로 시작)
  iconPosition = 'left', // 아이콘 위치 기본값
  loading = false,     // 로딩 상태 기본값
  fullWidth = false,   // 전체 너비 기본값
  children,
  className = '',      // 추가 클래스 기본값
  disabled,            // 비활성화 상태
  ...props
}) => {
  // 기본 버튼 스타일
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // variant에 따른 스타일 (다크 모드 스타일 추가 및 디자인 시스템 색상 적용)
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm focus:ring-primary-500 ' +
             'dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-400', // primary 색상 사용
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-sm focus:ring-slate-500 ' +
               'dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:focus:ring-gray-500', // slate/gray 색상 사용
    outline: 'border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm focus:ring-slate-500 ' +
             'dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 dark:focus:ring-gray-500', // slate/gray 색상 사용
    ghost: 'hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-500 ' +
           'dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100 dark:focus:ring-gray-500', // slate/gray 색상 사용
    destructive: 'bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500 ' +
                 'dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400' // red 색상 사용
  };

  // size에 따른 스타일
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3'
  };

  // 아이콘 크기 스타일
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  // 전체 너비 적용 여부
  const widthClass = fullWidth ? 'w-full' : '';

  // 모든 클래스 조합
  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClass}
    ${className}
  `.trim();

  // 아이콘 또는 로딩 스피너 렌더링 함수
  const renderIcon = () => {
    if (loading) {
      // 로딩 스피너 (현재 버튼 텍스트 색상에 맞춤)
      return (
        <svg
          className={`animate-spin ${iconSizes[size]} ${variant === 'primary' || variant === 'destructive' ? 'text-white' : 'text-current'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
    }

    if (Icon) {
      // Lucide 아이콘 렌더링
      return <Icon className={iconSizes[size]} />;
    }

    return null;
  };

  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading} // 로딩 중일 때도 버튼 비활성화
      {...props}
    >
      {/* 아이콘 위치에 따라 아이콘과 자식 요소 렌더링 순서 결정 */}
      {iconPosition === 'left' && renderIcon()}
      {children && <span>{children}</span>} {/* children이 있을 때만 span 렌더링 */}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button;
