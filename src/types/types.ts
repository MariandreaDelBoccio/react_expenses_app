import type { User } from "firebase/auth"
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

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
  loading: boolean;
};

export type Category = {
  text: string;
  id: string;
}

export type CategoriesSelectProps = {
  category: string;
  changeCategory: (value: string) => void;
}

export type DatePickerProps = {
  date: Date;
  changeDate: (value: Date | undefined) => void;
}

export type FbStorageExpenses = {
  category: string
  description: string 
  quantity: string 
  date: number 
  id: string | undefined
}

export interface ExpensesFormProps {
    expense?: QueryDocumentSnapshot<DocumentData> | null;
}