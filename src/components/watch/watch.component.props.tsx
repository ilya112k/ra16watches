import {TForm} from "../../types/form.type.tsx";

export type WatchComponentProps = {
    data: TForm
    deleteAction: (watch: TForm) => void;
}