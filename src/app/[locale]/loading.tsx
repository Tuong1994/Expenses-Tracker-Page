import { Loading } from "@/components/UI";
import { FlexCol, FlexRow } from "@/components/UI/Flex";
import withLocale from "@/libs/withLocale";

const { Skeleton } = Loading;

const DashboardLoading = () => {
  return (
    <div className="w-full">
      <Skeleton type="title" />
      <FlexRow rootClassName="mb-5!" justify="between" aligns="middle">
        <FlexCol xs={24} md={12} lg={6} span={6}>
          <Skeleton type="button" options={{ width: "100%", height: "100px" }} />
        </FlexCol>
        <FlexCol xs={24} md={12} lg={6} span={6}>
          <Skeleton type="button" options={{ width: "100%", height: "100px" }} />
        </FlexCol>
        <FlexCol xs={24} md={12} lg={6} span={6}>
          <Skeleton type="button" options={{ width: "100%", height: "100px" }} />
        </FlexCol>
        <FlexCol xs={24} md={12} lg={6} span={6}>
          <Skeleton type="button" options={{ width: "100%", height: "100px" }} />
        </FlexCol>
      </FlexRow>

      <Skeleton rootClassName="mb-5!" type="button" options={{ width: "100%", height: "300px" }} />

      <FlexRow justify="between" rootClassName="mb-5!">
        <FlexCol xs={24} md={24} lg={24} span={12}>
          <Skeleton type="button" options={{ width: "100%", height: "300px" }} />
        </FlexCol>
        <FlexCol xs={24} md={24} lg={24} span={12}>
          <Skeleton type="button" options={{ width: "100%", height: "300px" }} />
        </FlexCol>
      </FlexRow>

      <Skeleton type="button" options={{ width: "100%", height: "300px" }} />
    </div>
  );
};

export default withLocale(DashboardLoading);
