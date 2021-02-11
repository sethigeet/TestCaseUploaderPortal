import { FC, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import {
  EditModuleInput,
  getEditMenuMutationOptions,
  useEditMenuMutation,
  useGetMenuQuery,
} from "@portal/controller";

import { FormOnSubmit } from "../../../types";
import { toFormikError } from "../../../utils";

import { EditMenuView } from "./View";

export type EditMenuFormOnSubmit = FormOnSubmit<EditModuleInput>;

export const EditMenuConnector: FC = () => {
  const { menuId } = useParams<{ menuId: string }>();

  const [error, setError] = useState(false);
  const { data, error: getMenuError, loading } = useGetMenuQuery({
    variables: { id: menuId },
  });
  const [editMenu, { error: editMenuError }] = useEditMenuMutation();
  const history = useHistory();

  const onSubmit: EditMenuFormOnSubmit = async (
    values,
    { setSubmitting, setErrors }
  ) => {
    const res = await editMenu(
      getEditMenuMutationOptions({ input: values, id: menuId })
    );

    if (res.errors) {
      if (!error) {
        setError(true);
      }
      setSubmitting(false);
      return;
    }

    if (res.data?.editMenu.errors) {
      setErrors(toFormikError(res.data?.editMenu.errors));
      return;
    }

    history.push(`/masters/menus/${menuId}`);

    setSubmitting(false);
  };

  if ((editMenuError || getMenuError) && !error) {
    setError(true);
  }
  if (!loading && !data?.getMenu && !error) {
    setError(true);
  }

  return (
    <div>
      <EditMenuView
        onSubmit={onSubmit}
        errorMessage={
          error
            ? {
                message:
                  "There was an error while editing the menu. Make sure that you are connected to the internet!",
              }
            : undefined
        }
        loading={loading}
        initialValues={
          data?.getMenu
            ? {
                code: data?.getMenu.code,
                name: data?.getMenu.name,
                deprecated: data?.getMenu.deprecated,
              }
            : undefined
        }
      />
    </div>
  );
};
