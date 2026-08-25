"use client";

import { FC, useMemo, useState } from "react";
import { Form, FormItem, Input } from "@/components/Control";
import { FlexCol, FlexRow } from "@/components/UI/Flex";
import { UserFormData } from "@/services/user/type";
import { ERole } from "@/services/user/enum";
import { SingleImageUpload } from "@/components/Control/Upload/Image";
import { ControlColor } from "@/components/Control/type";
import { Button, Card, Divider } from "@/components/UI";
import { useTranslations } from "next-intl";
import PasswordFormModal from "./PasswordFormModal";
import ExpiredSessionModal from "@/components/Page/ExpiredSessionModal";
import useLayout from "@/components/UI/Layout/useLayout";
import useUserStore from "@/store/UserStore";
import useUpdateUser from "../hooks/useUpdateUser";
import useLogout from "@/features/auth/hooks/useLogout";

const UpdateForm: FC = () => {
  const t = useTranslations();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const user = useUserStore((state) => state.user);

  const [image, setImage] = useState<File | null>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [openReloginModal, setOpenReloginModal] = useState<boolean>(false);

  const { isLoading: updateLoading, mutate: onUpdateUser } = useUpdateUser();

  const { isLoading: logoutLoading, mutate: onLogout } = useLogout();

  const initialData: UserFormData = useMemo(
    () => ({
      email: user ? user.email : "",
      phone: user ? user.phone : "",
      firstName: user ? user.firstName : "",
      lastName: user ? user.lastName : "",
      role: user ? user.role : ERole.STAFF,
    }),
    [user]
  );

  const handleTriggerModal = () => setOpenModal(!openModal);

  const handleUpload = (file: File | null) => setImage(file);

  const handleRelogin = () => {
    setOpenModal(false);
    setOpenReloginModal(true);
  };

  const handleLogout = () => {
    onLogout();
    setOpenReloginModal(false);
  };

  const handleSubmit = (data: UserFormData) => {
    const formData = new FormData();
    if (image) formData.append("image", image);
    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value as string);
    }
    onUpdateUser({ query: { userId: user?.id }, formData });
  };

  return (
    <>
      <FlexRow>
        <FlexCol xs={24} md={24} lg={24} span={12}>
          <Card>
            <Form<UserFormData>
              disabled={updateLoading}
              color={layoutColor as ControlColor}
              initialData={initialData}
              onFinish={handleSubmit}
            >
              <FlexRow>
                <FlexCol xs={24} md={6} lg={6} span={6}>
                  <SingleImageUpload defaultImageUrl={user?.image?.path} onUpload={handleUpload} />
                </FlexCol>
                <FlexCol xs={24} md={18} lg={18} span={18}>
                  <FormItem name="email">
                    <Input label={t("common.form.label.email")} />
                  </FormItem>
                  <Button ghost color="red" type="button" onClick={handleTriggerModal}>
                    {t("user.changePassword")}
                  </Button>
                </FlexCol>
              </FlexRow>
              <Divider>{t("user.general")}</Divider>
              <FlexRow>
                <FlexCol xs={24} md={12} lg={12} span={12}>
                  <FormItem name="firstName">
                    <Input label={t("common.form.label.firstName")} />
                  </FormItem>
                </FlexCol>
                <FlexCol xs={24} md={12} lg={12} span={12}>
                  <FormItem name="lastName">
                    <Input label={t("common.form.label.lastName")} />
                  </FormItem>
                </FlexCol>
                <FlexCol xs={24} md={12} lg={12} span={12}>
                  <FormItem name="phone">
                    <Input label={t("common.form.label.phone")} />
                  </FormItem>
                </FlexCol>
              </FlexRow>
              <FlexRow justify="end">
                <FlexCol>
                  <Button type="submit">{t("common.actions.save")}</Button>
                </FlexCol>
              </FlexRow>
            </Form>
          </Card>
        </FlexCol>
      </FlexRow>

      <PasswordFormModal open={openModal} onRelogin={handleRelogin} onCancel={handleTriggerModal} />

      <ExpiredSessionModal
        open={openReloginModal}
        isLoading={logoutLoading}
        note={t("auth.passwordNote")}
        onOk={handleLogout}
      />
    </>
  );
};

export default UpdateForm;
