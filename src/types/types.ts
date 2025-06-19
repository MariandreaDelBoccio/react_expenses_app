import type { User } from "firebase/auth"

export interface ButtonProps {
    $primary?: boolean
    $hasIcon?: boolean
    $bigIcon?: boolean
}

export interface AlertComponentProps {
    $type: string
    $message: string
    $alertStatus: boolean
    $changeAlertStatus: (value: boolean) => void
}

export type AuthContextType = {
  user: User | null;
};